// Show word list when Start Button is clicked
const startBtn = document.getElementById('start-btn');
const wordList = document.getElementById('word-list');

startBtn.addEventListener('click', () => {
    wordList.style.display = 'grid'; // Show the word list
    startBtn.style.display = 'none'; // Hide the Start Button
});

// Voice functionality
const voiceButtons = document.querySelectorAll('.voice-button');

voiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const text = button.getAttribute('data-text'); // Get the text to speak
        speakText(text);
    });
});

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN'; // Set language to Tamil (India)
    utterance.volume = 1; // Ensure volume is set to maximum
    utterance.rate = 1; // Normal speech rate
    utterance.pitch = 1; // Normal pitch
    speechSynthesis.speak(utterance); // Speak the text
}