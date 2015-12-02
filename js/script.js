
  var navbar = document.querySelector('.page-header__navbar'),
      navbarLines = navbar.querySelector('.navbar-toggle__lines'),
      navbarToggle = navbar.querySelector('.navbar-toggle'),
      menu = document.querySelector('.page-header__nav-wrap');
  
  navbarToggle.addEventListener('click', function(e) {
    e.preventDefault;
    
    navbar.classList.toggle('page-header__navbar--active');
    navbarLines.classList.toggle('navbar-toggle__lines--close');
    menu.classList.toggle('page-header__nav-wrap--drop-down');
    
  });
