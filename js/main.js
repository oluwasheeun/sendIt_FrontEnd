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

if (localStorage.getItem('jwt') === null) {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('logout').style.display = 'none';
} else {
  document.getElementById('log-in').classList.add('no-display');
}

//Logout User
const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
  localStorage.clear();

  window.location.href = './login.html';
});
