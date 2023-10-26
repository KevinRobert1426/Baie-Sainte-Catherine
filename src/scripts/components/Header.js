export default class Header {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur laquel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.scrollLimit = 0.1;
    if ('scrollLimit' in this.element.dataset) {
      this.scrollLimit = parseFloat(this.element.dataset.scrollLimit);
    }
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;
    this.init();
    this.initNavMobile();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    console.log('voici mon header');
    console.log(this.scrollLimit);
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  /**
   * Méthode constructeur
   * @param {Event} event - L'événement de défiler la page
   */
  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    // Permet de ne pas cacher le header en scrollant
    if (!('notHiding' in this.element.dataset)) {
      this.setHeaderState();
    }
    this.setDirectionState();
  }

  /**
   * Méthode SetHeaderState
   * Détecte notre position sur la page afin de cacher le header
   */
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;

    if (this.scrollPosition > scrollHeight * this.scrollLimit) {
      console.log('header-is-hidden');
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }

  /**
   * Méthode setDirectionState
   * Détermine si on défile la page vers le haut ou vers le bas
   */
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  /**
   * Méthode initNavMobile
   * Permet d'activer le bouton hamburger quand on est en format mobile
   */
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');

    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  /**
   * Méthode onToggleNav
   * Fait apparaitre la nav
   */
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
