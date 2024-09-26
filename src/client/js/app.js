import '../../service-worker.js';

const analyzeButton = document.getElementById('analyze-btn');
const inputText = document.getElementById('input-text');
const resultContainer = document.getElementById('result');
const errorMessage = document.getElementById('error-message');

analyzeButton.addEventListener('click', async () => {
    const text = inputText.value;
    errorMessage.textContent = ''; // Clear previous error message

    // Validate input
    if (!text) {
        errorMessage.textContent = 'Input cannot be empty.';
        return;
    }
    if (text.length > 100) { // Set max length as needed
        errorMessage.textContent = 'Input exceeds maximum length of 500 characters.';
        return;
    }

    const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    const data = await response.json();
    resultContainer.textContent = JSON.stringify(data, null, 2);
});
