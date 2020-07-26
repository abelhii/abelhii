import { loadHtml, getRandomInt, isVowel } from './scripts/helper.mjs'

// CONSTS
const adjectives = ["irish", "malaysian", "wonderful", "affectionate", "adventurous", "ambitious", "creative", "passionate", "full stack"];
const nouns = ["nerd", "designer", "coder", "gamer", "developer", "programmer", "monkey", "geek", "engineer", "man", "tinkerer"];

// LOAD HTML
loadHtml('./sections/header/index.html', '.header').then(() => {
    // Loop subtitles
    let subtitle = document.getElementsByClassName('subtitle')[0];
    setInterval(() => {
        let adjective = adjectives[getRandomInt(0, adjectives.length)];
        let noun = nouns[getRandomInt(0, nouns.length)];
        let subject = `is ${isVowel(adjective[0]) ? 'an' : 'a'}`;
        let description = `${subject} ${adjective} ${noun}`;
        subtitle.innerHTML = description;
    }, 1500);

    // Load abelavatar script
    var tag = document.createElement("script");
    tag.src = "scripts/abelavatar.mjs";
    document.getElementsByTagName("head")[0].appendChild(tag);
});

loadHtml('./sections/about/index.html', '.about');
loadHtml('./sections/portfolio/index.html', '.portfolio');
loadHtml('./sections/contact/index.html', '.contact');


// Nav
var nav = document.querySelector('.navigation');
// Container
var container = document.querySelector('.container');
var header = document.querySelector('.header').getBoundingClientRect();
// EVENT LISTENERS

// Make things happen as user scrolls through the page
container.addEventListener('scroll', () => {
    // Display nav halfway through the header section
    if ((header.bottom / 2) <= container.scrollTop) {
        nav.classList.add('display');
    } else if (nav.classList.contains('display')) {
        nav.classList.remove('display');
    }
});
