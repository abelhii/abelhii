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
loadHtml('./sections/portfolio/portfolio.html', '.portfolio').then(() => {
    // init swiperjs
    var portfolioSwiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
});
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

    // If in mobile view remove scroll snap
    if (container.clientWidth > 425) {
        let pad = 250;
        // change scroll snap if viewport is within about and portfolio sections
        let witihinAboutAndPort = about.top <= container.scrollTop && (portfolio.bottom - pad) >= container.scrollTop;
        if (witihinAboutAndPort) {
            container.style.scrollSnapType = "y";   // proximity
        } else if (getComputedStyle(container).scrollSnapType == "y") {
            container.style.scrollSnapType = 'y mandatory';
        }
    } else {
        container.style.scrollSnapType = "none";
    }
});
