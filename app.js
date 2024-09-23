const btn = document.querySelector('.talk');
const content = document.querySelector('.content')

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});
btn.addEventListener('touchstart', () => {
    content.textContent = "Listening...";
    recognition.start();
});
btn.addEventListener('touchend', () => {
    recognition.stop();
});
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;

    window.speechSynthesis.speak(text_speak);
}
function wishme() {
    var day = new Date();
    var hour = day.getHours;

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sir...");
    }
    else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Sir...");
    }
    else{
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing RAJU...");
    wishme();
})

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition;

recognition.lang = 'en-US', 'urdu';
recognition.maxResults = 10;

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}
navigator.mediaDevices.getUserMedia({
    audio: true,
    privacy: { microphone: true },
    foregroundServiceType: 'microphone'
})
.then(stream => {
    // Create an audio context
    const audioContext = new AudioContext();
    const mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect the audio context to the speech recognition
    recognition.audioContext = audioContext;
    recognition.mediaStreamSource = mediaStreamSource;

    recognition.start();
})
.catch(error => {
    console.error('Error accessing microphone:', error);
});

// Add Samsung Internet browser specific code
if (navigator.userAgent.indexOf('SamsungBrowser') !== -1) {
    // Add specific code to handle Samsung Internet browser
    recognition.lang = 'en-US';
    recognition.maxResults = 10;
}
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } 
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
