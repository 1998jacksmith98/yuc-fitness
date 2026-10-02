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
        <a href="#clients">Clients</a>
        <a href="#codes">Codes</a>
        <a href="${IG}" target="_blank" rel="noreferrer">Instagram</a>
        <a href="${WA}" target="_blank" rel="noreferrer">WhatsApp</a>
      </nav>
      <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>
  <div class="mobile-nav" hidden>
    <nav>
      <a href="index.html">Home</a>
      <a href="#clients">Clients</a>
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
        <p><a href="#clients">Clients</a></p>
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
    btn.setAttribute("aria-label", "Menu");
    btn.setAttribute("aria-expanded", "false");
  } else {
    nav.removeAttribute("hidden");
    document.body.classList.add("menu-open");
    btn.setAttribute("aria-label", "Close");
    btn.setAttribute("aria-expanded", "true");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    nav.setAttribute("hidden", "");
    document.body.classList.remove("menu-open");
    btn.setAttribute("aria-label", "Menu");
    btn.setAttribute("aria-expanded", "false");
  });
});

(function dockAfterHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const sync = () => {
    if (window.innerWidth > 819) {
      document.body.classList.remove("dock-on");
      return;
    }
    const bottom = hero.getBoundingClientRect().bottom;
    if (bottom < 90) document.body.classList.add("dock-on");
    else document.body.classList.remove("dock-on");
  };
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
})();

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  document.querySelectorAll("[data-stagger]").forEach((parent) => {
    [...parent.children].forEach((child, i) => {
      child.classList.add("reveal");
      child.style.transitionDelay = `${80 + i * 90}ms`;
      io.observe(child);
    });
  });
} else {
  document.querySelectorAll(".reveal, [data-stagger] > *").forEach((el) => {
    el.classList.add("is-in");
  });
}

(function scrub() {
  const track = document.querySelector(".scrub");
  const video = document.querySelector(".scrub-video");
  if (!track || !video) return;

  video.muted = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const arm = () => {
    const play = video.play();
    if (play && play.then) {
      play.then(() => {
        video.pause();
      }).catch(() => {});
    }
  };

  video.addEventListener("loadeddata", arm, { once: true });
  window.addEventListener("touchstart", arm, { once: true, passive: true });
  window.addEventListener("click", arm, { once: true });

  let ticking = false;
  const update = () => {
    ticking = false;
    if (!video.duration) return;
    const rect = track.getBoundingClientRect();
    const run = track.offsetHeight - window.innerHeight;
    if (run <= 0) return;
    const scrolled = Math.min(Math.max(-rect.top, 0), run);
    const t = (scrolled / run) * Math.max(video.duration - 0.05, 0);
    if (Math.abs(video.currentTime - t) > 0.03) {
      try { video.currentTime = t; } catch (e) {}
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  video.addEventListener("loadedmetadata", update);
})();
