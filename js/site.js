const WA = "https://wa.link/iih15s";
const IG = "https://www.instagram.com/yucfitness/";
const TT = "https://www.tiktok.com/@yucelhulusi";
const YT = "https://www.youtube.com/@YucelHulusi";
const FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdB3B9SoQ4emxKBwLFNA4mUOZrH3RlbF3JBhRPZW9UsjqebEw/viewform?usp=sharing";

const page = location.pathname.split("/").pop() || "index.html";

document.getElementById("site-header").innerHTML = `
  <div class="preview-banner">Preview mockup by <a href="https://halfpennydigital.co.uk/">Halfpenny Digital</a> — not the live site yet</div>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="index.html">Exalted <span>Coaching</span></a>
      <nav class="desk-nav">
        <a href="index.html" class="${page === "index.html" ? "active" : ""}">Home</a>
        <a href="#codes">Codes</a>
        <a href="${IG}" target="_blank" rel="noreferrer">Instagram</a>
        <a href="${WA}" target="_blank" rel="noreferrer">WhatsApp</a>
      </nav>
      <button class="menu-btn" type="button" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </header>
  <div class="mobile-nav" hidden>
    <nav>
      <a href="index.html">Home</a>
      <a href="#codes">Codes</a>
      <a href="${IG}" target="_blank" rel="noreferrer">Instagram</a>
      <a href="${TT}" target="_blank" rel="noreferrer">TikTok</a>
      <a href="${YT}" target="_blank" rel="noreferrer">YouTube</a>
      <a href="${WA}" target="_blank" rel="noreferrer">WhatsApp</a>
      <a href="${FORM}" target="_blank" rel="noreferrer">Enquiry form</a>
    </nav>
  </div>
  <div class="mobile-cta">
    <a class="btn" href="${WA}" target="_blank" rel="noreferrer">WhatsApp</a>
    <a class="btn ghost" href="${IG}" target="_blank" rel="noreferrer">Instagram</a>
  </div>
`;

document.getElementById("site-footer").innerHTML = `
  <footer>
    <div class="wrap footer-grid">
      <div>
        <p class="brand">Exalted <span>Coaching</span></p>
        <p>Online coaching with Yucel Hulusi.</p>
      </div>
      <div>
        <p><a href="${WA}" target="_blank" rel="noreferrer">WhatsApp</a></p>
        <p><a href="${FORM}" target="_blank" rel="noreferrer">Enquiry form</a></p>
        <p><a href="#codes">Codes</a></p>
      </div>
      <div>
        <p><a href="${IG}" target="_blank" rel="noreferrer">Instagram</a></p>
        <p><a href="${TT}" target="_blank" rel="noreferrer">TikTok</a></p>
        <p><a href="${YT}" target="_blank" rel="noreferrer">YouTube</a></p>
      </div>
    </div>
    <div class="wrap credit">Website built by <a href="https://halfpennydigital.co.uk/">Halfpenny Digital</a></div>
  </footer>
`;

const btn = document.querySelector(".menu-btn");
const nav = document.querySelector(".mobile-nav");
btn.addEventListener("click", () => {
  const open = !nav.hasAttribute("hidden");
  if (open) {
    nav.setAttribute("hidden", "");
    document.body.classList.remove("menu-open");
  } else {
    nav.removeAttribute("hidden");
    document.body.classList.add("menu-open");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    nav.setAttribute("hidden", "");
    document.body.classList.remove("menu-open");
  });
});
