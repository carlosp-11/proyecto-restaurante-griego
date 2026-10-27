function initSubmenus() {
  const toggles = document.querySelectorAll('.submenu-toggle');

  toggles.forEach((toggle) => {
    const item = toggle.closest('.main-nav__item');
    const submenu = document.getElementById(toggle.getAttribute('aria-controls'));

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open);
      submenu.classList.toggle('is-open', open);
    }

    // The arrow button only appears when JS can make it work
    toggle.hidden = false;

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close it when the focus or a click goes somewhere else
    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });

    document.addEventListener('click', (event) => {
      if (!item.contains(event.target)) {
        setOpen(false);
      }
    });

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && submenu.classList.contains('is-open')) {
        event.stopPropagation();
        setOpen(false);
        toggle.focus();
      }
    });
  });
}

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

  initSubmenus();
}
