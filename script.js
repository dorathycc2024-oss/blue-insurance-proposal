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

// Tabs functionality
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    const parent = btn.closest('.section');

    // Update active button
    parent.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Update active panel
    parent.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.remove('active');
      if (panel.id === tabId) {
        panel.classList.add('active');
      }
    });
  });
});

// Accordion functionality
document.querySelectorAll('details.accordion').forEach((accordion) => {
  accordion.addEventListener('toggle', () => {
    const isOpen = accordion.open;
    accordion.querySelectorAll('details.accordion').forEach((other) => {
      if (other !== accordion) {
        other.open = false;
      }
    });
  });
});
