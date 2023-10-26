import Swiper from 'swiper/bundle';

export default class Carousel {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur laquel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.options = {
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
      slidesPerView: 1,
      breakpoints: '',
      autoplay: '',
      loop: '',
      spaceBetween: 20,
    };
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.setOptions();
    new Swiper(this.element, this.options);
  }

  /**
   * Méthode setOptions
   */
  setOptions() {
    const variant = this.element.dataset.variant;

    // Caroursel avec 2.5 slide sur l'écran
    if (variant == 'split') {
      this.options.breakpoints = {
        768: {
          slidesPerView: 2.5,
        },
      };
    }

    // Caroursel avec 3 slide sur l'écran
    if (variant == 'split3') {
      this.options.breakpoints = {
        720: {
          slidesPerView: 3,
          loop: true,
        },
      };
    }

    // Permet de faire défiler le carousel automatiquement
    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 2500,
        disableOnInteraction: false,
      };
    }

    // Permet de faire défiler le carousel à l'infini
    if ('loop' in this.element.dataset) {
      this.options.loop = {
        loop: true,
      };
    }

    // Permet d'ajuster la marge entre les slides
    if ('gap' in this.element.dataset) {
      this.options.spaceBetween = parseInt(this.element.dataset.gap);
    }
  }
}
