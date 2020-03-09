import { loadHtml, getRandomInt, isVowel } from './modules/helper.js'

// CONSTS
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

// TODO: Clean up code
// DOM ELEMENTS

// Nav
var nav = document.querySelector('.navigation');
var navItems = document.querySelector('.navigation').children[0].children;
// Container
var container = document.querySelector('.container');
var header = document.querySelector('.header').getBoundingClientRect();
var about = document.getElementById('about').getBoundingClientRect();
var portfolio = document.getElementById('portfolio').getBoundingClientRect();
var contact = document.getElementById('contact').getBoundingClientRect();

// EVENT LISTENERS

// Make things happen as user scrolls through the page
container.addEventListener('scroll', () => {
    // Display nav halfway through the header section
    if ((header.bottom / 2) <= container.scrollTop) {
        nav.classList.add('display');
    } else if (nav.classList.contains('display')) {
        nav.classList.remove('display');
    }

    // set navigation to be active
    if (about.top <= container.scrollTop && about.bottom >= container.scrollTop) {
        navItems[1].classList.remove('active');
        navItems[2].classList.remove('active'); 
        navItems[0].classList.add('active'); 
    } else if (portfolio.top <= container.scrollTop && portfolio.bottom >= container.scrollTop) {
        navItems[0].classList.remove('active');
        navItems[2].classList.remove('active'); 
        navItems[1].classList.add('active'); 
    } else if (contact.top <= container.scrollTop) {
        navItems[0].classList.remove('active');
        navItems[1].classList.remove('active'); 
        navItems[2].classList.add('active'); 
    }

    // When scrolling to about section disable css scroll snap
    let padding = 200;
    let withinAboutSection = (about.top) <= container.scrollTop &&
        (about.bottom - padding) >= container.scrollTop;

    if (withinAboutSection) {
        container.style.scrollSnapType = "none";
    } else if (getComputedStyle(container).scrollSnapType == "none") {
        container.style.scrollSnapType = 'y mandatory';
    }
});
