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
// loadHtml('./sections/portfolio/index.html', '.portfolio');
loadHtml('./sections/contact/index.html', '.contact');



// Make Nav appear
var nav = document.querySelector('.navigation');
var header = document.querySelector('.header').getBoundingClientRect();

var locked = false;
// what should we do when scrolling occurs
var runOnScroll = function (evt) {
    if (locked) return;

    // Display nav halfway through the header section
    if ((header.bottom / 2) <= window.scrollY) {
        nav.classList.add('display');
    } else if (nav.classList.contains('display')) {
        nav.classList.remove('display');
    }

    locked = false;
};

window.addEventListener("scroll", runOnScroll, { passive: true });
