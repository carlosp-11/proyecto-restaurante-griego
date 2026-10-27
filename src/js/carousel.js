import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initCarousel() {
  const carousel = document.querySelector('.dishes-carousel');

  if (!carousel) {
    return;
  }

  new Swiper(carousel, {
    modules: [Navigation, Pagination, Keyboard, A11y],
    slidesPerView: 1.15,
    spaceBetween: 16,
    breakpoints: {
      768: { slidesPerView: 2.2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 32 }
    },
    navigation: {
      prevEl: carousel.querySelector('.swiper-button-prev'),
      nextEl: carousel.querySelector('.swiper-button-next')
    },
    pagination: {
      el: carousel.querySelector('.swiper-pagination'),
      clickable: true
    },
    keyboard: { enabled: true },
    a11y: {
      prevSlideMessage: 'Plato anterior',
      nextSlideMessage: 'Plato siguiente',
      paginationBulletMessage: 'Ir al plato {{index}}',
      slideLabelMessage: '{{index}} de {{slidesLength}}'
    }
  });
}
