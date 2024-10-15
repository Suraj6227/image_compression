// Get references to HTML elements
const imageInput = document.getElementById('imageInput');
const imageCanvas = document.getElementById('imageCanvas');
const ctx = imageCanvas.getContext('2d');
const compressionLevelInput = document.getElementById('compressionLevel');
const compressionLabel = document.getElementById('compressionLabel');
const compressButton = document.getElementById('compressButton');
const downloadLink = document.getElementById('downloadLink');

let originalImageData = null;

// Function to handle image upload
imageInput.addEventListener('change', handleImageUpload);
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image();
    img.onload = function() {
        // Resize canvas to fit the image
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(file);
}

// Update compression level label when slider value changes
compressionLevelInput.addEventListener('input', function() {
    const percentage = Math.round(compressionLevelInput.value * 100);
    compressionLabel.textContent = `${percentage}%`;
});

// Function to compress the image
compressButton.addEventListener('click', function() {
    // Get the compression quality from the slider
    const compressionQuality = parseFloat(compressionLevelInput.value);

    // Convert the canvas image to a compressed data URL
    const compressedDataUrl = imageCanvas.toDataURL('image/jpeg', compressionQuality);

    // Update the download link with the compressed data URL
    downloadLink.href = compressedDataUrl;
    downloadLink.style.display = 'inline-block';
});

// Reset the input if necessary
imageInput.addEventListener('change', function() {
    // Reset download link display
    downloadLink.style.display = 'none';
});
