document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.mlc-accordion__trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      
      // Toggle the clicked accordion
      if (!expanded) {
        // Optional: close all other accordions
        triggers.forEach(t => {
          t.setAttribute('aria-expanded', 'false');
        });
        
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
