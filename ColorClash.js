const game_section = document.querySelector('.game-section');
const assessment = document.querySelector('.assessment');
const game_button = document.querySelectorAll('.game-button');
const easy = document.querySelector('.easy');
const mid = document.querySelector('.mid');
const hard = document.querySelector('.hard');
const newColors = document.querySelector('.new-colors');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');

let range = 50;
let mode = Number(localStorage.getItem('mode')) || 1;

NewRound();
newColors.onclick = NewRound;

easy.onclick = () => { 
    mode = 1; 
    NewRound();
    localStorage.setItem('mode', mode);
};
mid.onclick = () => { 
    mode = 2; 
    NewRound();
    localStorage.setItem('mode', mode);
};
hard.onclick = () => { 
    mode = 3; 
    NewRound();
    localStorage.setItem('mode', mode);
};

function Rand(max = 256) {
    return Math.floor(Math.random() * max);
}

function GenerateColors(num, hard = false) {
    let colors = [];

    if (hard) {
        let baseR = Rand(236), baseG = Rand(236), baseB = Rand(236);
        for (let i = 0; i < num; i++) {colors.push(`rgb(${baseR + Rand(range)}, ${baseG + Rand(range)}, ${baseB + Rand(range)})`);}
    } 
    else {for (let i = 0; i < num; i++) {colors.push(`rgb(${Rand()}, ${Rand()}, ${Rand()})`);}}

    return colors;
}

function NewRound() {
    game_section.innerHTML = '';
    assessment.textContent = '';

    let numColors = mode === 1 ? 3 : mode === 2 ? 6 : 3;
    let colors = GenerateColors(numColors, mode === 3);
    correctColor = colors[Rand(colors.length)];

    const [r, g, b] = correctColor.match(/\d+/g).map((x) => parseInt(x, 10));
    red.textContent = r;
    green.textContent = g;
    blue.textContent = b;

    colors.forEach((color) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.backgroundColor = color;
        square.onclick = () => CheckGuess(color);
        game_section.appendChild(square);
    });

    ActiveMode();
}

function CheckGuess(color) {
    if (color === correctColor) {assessment.textContent = 'Correct 🎉🥳';} 
    else {assessment.textContent = 'Not correct 🥀';}
}

function ActiveMode() {
    game_button.forEach(button => {
        button.style.backgroundColor = 'white';   
        button.style.color = 'black';
    });

    game_button[mode].style.backgroundColor = 'black';   
    game_button[mode].style.color = 'white';
}