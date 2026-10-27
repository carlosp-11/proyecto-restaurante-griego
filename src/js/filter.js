export function initFilter() {
  const filter = document.querySelector('.dish-filter');

  if (!filter) {
    return;
  }

  const buttons = filter.querySelectorAll('button');
  const items = document.querySelectorAll('.dish-grid > li');
  const status = filter.querySelector('.dish-filter__status');

  // The filter only makes sense with JS, so it starts hidden in the HTML
  filter.hidden = false;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.filter;
      let visible = 0;

      items.forEach((item) => {
        const card = item.querySelector('.dish-card');
        const show = type === 'all' || card.dataset.type === type;
        item.hidden = !show;
        if (show) {
          visible++;
        }
      });

      buttons.forEach((other) => {
        other.setAttribute('aria-pressed', other === button);
      });

      status.textContent = visible === 1 ? 'Se muestra 1 plato' : `Se muestran ${visible} platos`;
    });
  });
}
