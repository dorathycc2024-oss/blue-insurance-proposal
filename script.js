const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

// Persona Tabs functionality
document.querySelectorAll('.persona-tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const personaId = btn.getAttribute('data-persona');
    const section = btn.closest('.section');

    // Update active button
    section.querySelectorAll('.persona-tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Update active panel
    section.querySelectorAll('.persona-panel').forEach((panel) => {
      panel.classList.remove('active');
      if (panel.id === personaId) {
        panel.classList.add('active');
      }
    });
  });
});
