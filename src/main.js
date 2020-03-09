import { loadHtml, getRandomInt, isVowel } from './modules/helper.js'

// CONSTSg
const adjectives = ["irish", "malaysian", "wonderful", "affectionate", "dumb", "adventurous", "lazy", "ambitious", "smelly", "creative", "passionate", "reliable", "resourceful", "full stack"];
const nouns = ["nerd", "designer", "coder", "gamer", "developer", "programmer", "monkey", "robot", "geek", "engineer", "man", "tinkerer"];

// LOAD HTML
loadHtml('./sections/header/header.html', '.header').then(() => {
    // Loop subtitles
    let subtitle = document.getElementsByClassName('subtitle')[0];
    setInterval(() => {
        let adjective = adjectives[getRandomInt(0, adjectives.length)];
        let noun = nouns[getRandomInt(0, nouns.length)];
        let subject = `is ${isVowel(adjective[0]) ? 'an' : 'a'}`;
        let description = `${subject} ${adjective} ${noun}`;
        subtitle.innerHTML = description;
    }, 1500);
});

loadHtml('./sections/about/about.html', '.about');
loadHtml('./sections/portfolio/portfolio.html', '.portfolio');
loadHtml('./sections/contact/contact.html', '.contact');

// When scrolling to about section disable css scroll snap
var about = document.getElementById('about').getBoundingClientRect();
var container = document.getElementsByClassName('container')[0];
container.addEventListener('scroll', () => {
    let padding = 200;
    let withinAboutSection = (about.top) <= container.scrollTop &&
                            (about.bottom - padding) >= container.scrollTop;

    if (withinAboutSection) {
        container.style.scrollSnapType = "none";
    } else if(getComputedStyle(container).scrollSnapType == "none") {
        container.style.scrollSnapType = 'y mandatory';
    }
});