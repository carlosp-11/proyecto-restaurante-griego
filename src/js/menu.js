export function initMenu() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');

  if (!button || !nav) {
    return;
  }

  document.documentElement.classList.add('has-js');

  function setOpen(open) {
    button.setAttribute('aria-expanded', open);
    nav.classList.toggle('is-open', open);
  }

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  // Close with Escape and give the focus back to the button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });
}
