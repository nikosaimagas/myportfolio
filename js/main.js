// main.js
document.addEventListener('DOMContentLoaded', function () {
  // Hero video: ensure it plays once and then stays paused (no loop)
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    // Some browsers block autoplay unless muted; we use muted attribute in HTML
    heroVideo.addEventListener('ended', () => {
      // keep it ended (don't loop)
      heroVideo.pause();
      // Optionally reveal a poster or overlay; we keep overlay visible
    });
  }

  // Smooth scrolling for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Add simple active link switching when scrolling into sections
  const qbLinks = document.querySelectorAll('.quickbar .qb-link');
  const sections = ['work', 'about'].map(id => document.getElementById(id)).filter(Boolean);

  function onScroll() {
    const y = window.scrollY + window.innerHeight * 0.3;
    let activeSet = false;
    for (let s of sections) {
      const rect = s.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top;
      const offsetBottom = offsetTop + rect.height;
      if (window.scrollY >= offsetTop - 60 && window.scrollY < offsetBottom - 60) {
        // set link active
        qbLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.quickbar a[href="#${s.id}"]`);
        if (link) link.classList.add('active');
        activeSet = true;
      }
    }
    if (!activeSet) {
      // if no section matched, make HOME active
      qbLinks.forEach(l => l.classList.remove('active'));
      const home = document.querySelector('.quickbar a[href="index.html"], .quickbar a[href="mainpage.html"], .quickbar a[href="/"]');
      if (home) home.classList.add('active');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
