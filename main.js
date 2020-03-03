import { loadHtml, getRandomInt } from './modules/helper.js'

// CONSTS
const subtitles = ["nerd", "designer", "coder", "irish", "gamer", "developer", "monkey", "malaysian"];

// LOAD HTML
loadHtml('./header/header.html', '.header').then(() => {
    // Loop subtitles
    let subtitle = document.getElementsByClassName('subtitle')[0];
    setInterval(() => {
        subtitle.innerHTML = subtitles[getRandomInt(0, subtitles.length)];
    }, 1300);
});
