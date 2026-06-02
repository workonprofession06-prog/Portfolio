/* ============================================================
   COMPONENTS — Navbar & Footer injected dynamically
   ============================================================ */

function getNavbarHTML(activePage) {
  const pages = [
    { href: '../index.html', label: 'Home', id: 'index' },
    { href: 'about.html', label: 'About', id: 'about' },
    { href: 'skills.html', label: 'Skills', id: 'skills' },
    { href: 'projects.html', label: 'Projects', id: 'projects' },
    { href: 'experience.html', label: 'Experience', id: 'experience' },
    { href: 'contact.html', label: 'Contact', id: 'contact' },
  ];

  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${p.id === activePage ? 'active' : ''}">${p.label}</a></li>`
  ).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.id === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');

  return `
  <div class="page-loader"><div class="loader-logo">FK</div></div>

  <nav class="navbar">
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo"><span>Faika</span> Khan</a>
      <ul class="nav-links">
        ${links}
        <li><a href="contact.html" class="nav-cta">Hire Me</a></li>
      </ul>
      <button class="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-nav">
    ${mobileLinks}
    <a href="contact.html" style="margin-top:0.5rem;background:var(--gradient-main);color:#fff;border-radius:var(--radius-xl);text-align:center;padding:14px;">Hire Me</a>
  </div>`;
}

function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="nav-logo"><span>Faika</span> Khan</span>
        <p>Full Stack Web Developer crafting digital experiences that combine elegant design with powerful functionality.</p>
        <div class="footer-socials">
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Navigation</h5>
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="skills.html">Skills</a></li>
          <li><a href="projects.html">Projects</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>More</h5>
        <ul>
          <li><a href="experience.html">Experience</a></li>
          <li><a href="case-study.html">Case Study</a></li>
          <li><a href="certifications.html">Certifications</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="mailto:faika@example.com">faika@example.com</a></li>
          <li><a href="#">Mumbai, India</a></li>
          <li><a href="#">+91 98765 43210</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 <span>Faika Khan</span>. All rights reserved.</p>
      <p>Designed & Built with <span>♥</span> by Faika Khan</p>
    </div>
  </footer>`;
}
