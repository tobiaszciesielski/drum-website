
let soundFilePaths = [
    "sounds/Bass-Drum.mp3",
    "sounds/Crash-Cymbal.mp3",
    "sounds/Drum-Sticks.mp3",
    "sounds/Floor-Tom-Drum.mp3",
    "sounds/Hi-Hat-Closed.mp3",
    "sounds/Hi-Hat-Open.mp3",
    "sounds/Snare-Drum.mp3",
    "sounds/Splash-Cymbal.mp3"
];

keyCodes = [
    97, // a 
    115, // s
    100, // d
    102, // f
    103, // g
    104, // h
    106, // j
    107 // k
];

let keyboardUnlocked = false;


let sounds = [];
for (const [index, soundPath] of soundFilePaths.entries()) {
    sounds.push({
        title : soundPath.slice(7, -4),
        activationKey : String.fromCharCode(keyCodes[index]),
        file : new Audio(soundPath)
    });
}


let drumDiv = document.querySelector(".drums");
for (const sound of sounds) {

    const button = document.createElement("div");
    button.className = 'sound-btn';

    let buttonTitle = document.createElement('p')
    buttonTitle.textContent = sound.title;
    button.appendChild(buttonTitle);

    let capitalKeySign = document.createElement('h3');
    capitalKeySign.textContent = sound.activationKey;
    button.appendChild(capitalKeySign);

    drumDiv.appendChild(button);
}


function playSoundWithSpecifiedKey(key, pad) {
    for (const sound of sounds) {
        if (sound.activationKey === key) {
            sound.file.currentTime = 0;
            sound.file.play();
            pad.style.animation ='none';
            pad.offsetHeight; 
            pad.style.animation = null; 
            pad.classList.add('click-animation');
        }  
    }  
}


const pads = document.querySelectorAll('.sound-btn');
for (const pad of pads) {
    pad.addEventListener("click", () => {
        const key = pad.querySelector('h3').textContent;
        playSoundWithSpecifiedKey(key, pad);
    });
};


document.addEventListener('keydown', (e) => {
    if(!e.repeat && keyboardUnlocked) {
        for (const pad of pads) {
            const key = pad.querySelector('h3').textContent;
            if (key === e.key) {
                playSoundWithSpecifiedKey(e.key, pad);
            }
        }
    }
});


const startButton = document.querySelector('.start-btn');
startButton.addEventListener('click', () => {
    const drumsHeader = document.querySelector('h1');
    const drumsText = document.querySelector('.text-canvas');
    const intro = document.querySelector('.intro');

    startButton.classList.add('exit-animation');
    startButton.classList.add('noHover');

    setTimeout(()=>{
        drumsHeader.style.opacity = "0";
        drumsText.style.opacity = "0";
        startButton.textContent = '';
    }, 1000);
    
    setTimeout(() => {
        intro.remove();
        pads.forEach((pad)=>{
            pad.classList.add("entrance-animation");
        });
        drumDiv.classList.remove("set-invisible");
    }, 1200);

    setTimeout(() => {
        pads.forEach((pad) => {
            pad.classList.remove("entrance-animation");
        });
        keyboardUnlocked = true;
    }, 2200);
});

