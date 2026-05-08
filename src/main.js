import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inyectar el navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = renderNavbar();
    }

    // Inyectar el footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = renderFooter();
    }

    // Lógica del botón hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }


});
