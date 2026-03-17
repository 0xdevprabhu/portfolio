// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const workspaceArea = document.getElementById('workspaceArea');
const controlsArea = document.getElementById('controlsArea');
const originalPreview = document.getElementById('originalPreview');
const resultPreview = document.getElementById('resultPreview');
const resultCard = document.getElementById('resultCard');
const progressArea = document.getElementById('progressArea');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const compressBtn = document.getElementById('compressBtn');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const downloadBtn = document.getElementById('downloadBtn');
const historyGrid = document.getElementById('historyGrid');

let currentFile = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderHistory();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Drag & Drop
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });

    // File Input & Paste
    fileInput.addEventListener('change', (e) => { if (e.target.files.length) handleFile(e.target.files[0]); });
    window.addEventListener('paste', (e) => {
        if (e.clipboardData.files.length) handleFile(e.clipboardData.files[0]);
    });

    // UI Controls
    qualitySlider.addEventListener('input', (e) => qualityValue.textContent = e.target.value);
    compressBtn.addEventListener('click', processImage);
}

// File Handling
function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('Only images are allowed, machi!', 'error');
        return;
    }
    currentFile = file;
    
    // UI Updates
    document.getElementById('origName').textContent = file.name;
    document.getElementById('origSize').textContent = formatBytes(file.size);
    document.getElementById('origFormat').textContent = file.type.split('/')[1].toUpperCase();
    updateMeter('origMeter', file.size);
    
    const reader = new FileReader();
    reader.onload = (e) => {
        originalPreview.src = e.target.result;
        workspaceArea.classList.remove('hidden');
        controlsArea.classList.remove('hidden');
        resultCard.classList.add('hidden');
    };
    reader.readAsDataURL(file);
    showToast('Image loaded! Ready for magic.');
}

// Core Image Processing
async function processImage() {
    if (!currentFile) return;

    compressBtn.disabled = true;
    progressArea.classList.remove('hidden');
    controlsArea.classList.add('hidden');
    progressBar.style.width = '10%';
    progressText.textContent = 'Preparing Canvas...';

    const maxDim = parseInt(document.getElementById('maxDimension').value) || 1920;
    
    try {
        const imageObj = await loadImage(originalPreview.src);
        progressBar.style.width = '40%';
        progressText.textContent = 'Crunching pixels...';

        let { blob, finalQuality } = await compressToTarget(imageObj, maxDim, 100 * 1024); // Target: 100KB

        progressBar.style.width = '90%';
        progressText.textContent = 'Finalizing WebP...';

        // Render Result
        const resultUrl = URL.createObjectURL(blob);
        resultPreview.src = resultUrl;
        
        document.getElementById('resultSize').textContent = formatBytes(blob.size);
        updateMeter('resultMeter', blob.size);
        
        const savedPercent = ((currentFile.size - blob.size) / currentFile.size * 100).toFixed(1);
        document.getElementById('compressionRatio').textContent = blob.size < currentFile.size ? `${savedPercent}% smaller` : 'Original was smaller';

        // Download Setup
        const newName = currentFile.name.replace(/\.[^/.]+$/, "") + ".webp";
        downloadBtn.href = resultUrl;
        downloadBtn.download = newName;

        // Save tiny thumbnail to history
        const thumbBlob = await generateThumbnail(imageObj);
        const reader = new FileReader();
        reader.onloadend = () => {
            saveToHistory(newName, currentFile.size, blob.size, reader.result);
        };
        reader.readAsDataURL(thumbBlob);

        resultCard.classList.remove('hidden');
        showToast(`Magic done! Reduced to ${formatBytes(blob.size)}`);

    } catch (error) {
        console.error(error);
        showToast('Oops, compression failed!', 'error');
    } finally {
        progressArea.classList.add('hidden');
        controlsArea.classList.remove('hidden');
        compressBtn.disabled = false;
        progressBar.style.width = '0%';
    }
}

// Compression Logic
async function compressToTarget(imageObj, maxDim, targetBytes) {
    const canvas = document.createElement('canvas');
    let { width, height } = imageObj;

    // Intelligent Resize
    if (width > maxDim || height > maxDim) {
        if (width > height) {
            height = Math.round((maxDim / width) * height);
            width = maxDim;
        } else {
            width = Math.round((maxDim / height) * width);
            height = maxDim;
        }
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageObj, 0, 0, width, height);

    let quality = parseInt(qualitySlider.value) / 100;
    let blob = await canvasToBlobAsync(canvas, 'image/webp', quality);

    // Iterative compression to hit < 100KB target
    while (blob.size > targetBytes && quality > 0.1) {
        quality -= 0.05;
        progressText.textContent = `Reducing quality to ${Math.round(quality*100)}%...`;
        blob = await canvasToBlobAsync(canvas, 'image/webp', quality);
    }

    return { blob, finalQuality: quality };
}

// Utility Functions
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function canvasToBlobAsync(canvas, mimeType, quality) {
    return new Promise(resolve => canvas.toBlob(resolve, mimeType, quality));
}

async function generateThumbnail(img) {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = (100 / img.width) * img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    return await canvasToBlobAsync(canvas, 'image/webp', 0.5);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function updateMeter(elementId, bytes) {
    const meter = document.getElementById(elementId);
    meter.className = 'size-meter';
    const kb = bytes / 1024;
    if (kb < 100) meter.classList.add('meter-good');
    else if (kb <= 200) meter.classList.add('meter-warn');
    else meter.classList.add('meter-bad');
}

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.borderLeftColor = type === 'error' ? 'var(--danger)' : 'var(--neon-cyan)';
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// LocalStorage History
function saveToHistory(name, oldSize, newSize, thumbBase64) {
    let history = JSON.parse(localStorage.getItem('webpMagicHistory') || '[]');
    history.unshift({ name, oldSize, newSize, thumbBase64, date: new Date().toLocaleTimeString() });
    if (history.length > 5) history.pop();
    localStorage.setItem('webpMagicHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    let history = JSON.parse(localStorage.getItem('webpMagicHistory') || '[]');
    historyGrid.innerHTML = '';
    if (history.length === 0) {
        historyGrid.innerHTML = '<p class="text-muted">No history yet.</p>';
        return;
    }
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item glass-card';
        div.innerHTML = `
            <img src="${item.thumbBase64}" alt="thumb">
            <div style="font-size: 0.7rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 80px;">${item.name}</div>
            <div style="color: var(--success); font-weight: bold; font-size: 0.75rem;">${formatBytes(item.newSize)}</div>
        `;
        historyGrid.appendChild(div);
    });
}