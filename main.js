import { loadHtml, getRandomInt, isVowel } from './modules/helper.js'

// CONSTS
const adjectives = ["irish", "malaysian", "wonderful", "agreeable", "dumb"]
const nouns = ["nerd", "designer", "coder", "pig", "gamer", "developer", "monkey"];

// LOAD HTML
loadHtml('./header/header.html', '.header').then(() => {
    // Loop subtitles
    let subtitle = document.getElementsByClassName('subtitle')[0];
    setInterval(() => {
        let adjective = adjectives[getRandomInt(0, adjectives.length)];
        let noun = nouns[getRandomInt(0, nouns.length)];
        let subject = `is ${isVowel(adjective[0]) ? 'an' : 'a'}`;
        let description = `${subject} ${adjective} ${noun}`;
        subtitle.innerHTML = description;
    }, 1600);
});
