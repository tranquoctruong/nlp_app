import '../../service-worker.js';

const analyzeButton = document.getElementById('analyze-btn');
const inputText = document.getElementById('input-text');
const resultContainer = document.getElementById('result');

analyzeButton.addEventListener('click', async () => {
    const text = inputText.value;
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
