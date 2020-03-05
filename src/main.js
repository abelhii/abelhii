import { loadHtml, getRandomInt, isVowel } from './modules/helper.js'

// CONSTSg
const adjectives = ["irish", "malaysian", "wonderful", "affectionate", "dumb", "adventurous", "lazy", "ambitious", "smelly", "creative", "skilled", "passionate", "exuberant", "reliable", "resourceful"];
const nouns = ["nerd", "designer", "coder", "gamer", "developer", "programmer", "monkey", "robot", "geek", "engineer", "man"];

// INIT SWIPER
let swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    parallax: true,
    speed: 600,
    slidesPerView: 'auto',
    mousewheel: {
        releaseOnEdges: true
    },
    hashNavigation: {
        watchState: true,
    },
});

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
    }, 1600);
});

loadHtml('./sections/about/about.html', '.about');
loadHtml('./sections/portfolio/portfolio.html', '.portfolio');
loadHtml('./sections/contact/contact.html', '.contact');

