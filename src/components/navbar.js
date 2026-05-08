import logoXtreme from '../assets/logo-xtreme.png';

export const renderNavbar = () => {
  const path = window.location.pathname;

  return `
    <header class="header">
        <div class="logo">
            <img src="${logoXtreme}" alt="Xtreme Wild Rift" style="height: 60px; object-fit: contain; border-radius: 8px;">
        </div>
        <button class="menu-toggle" aria-label="Abrir menú">
            <span class="hamburger"></span>
        </button>
        <nav class="navbar">
            <ul>
                <li><a href="./index.html" class="${path.includes("index.html") || path === "/" || path.endsWith("/Website-Project-UEES/") ? "active" : ""}"><i class="fa-solid fa-bolt"></i> Xtreme</a></li>
            </ul>
        </nav>
    </header>
    `;
};
