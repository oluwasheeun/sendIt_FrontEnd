// Sticky menu background
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        document.querySelector('#navbar').style.opacity = 0.9;
    } else {
        document.querySelector('#navbar').style.opacity = 1;
    }
});

//smooth scroll
const scroll = new SmoothScroll('#navbar a[href*="#"]', {
    speed: 800,
});
