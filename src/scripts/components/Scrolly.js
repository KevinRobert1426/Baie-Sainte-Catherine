export default class Scrolly {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur laquel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.options = {
      rootMargin: '0px',
    };
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    const observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options
    );

    // Permet d'observer chaque objet avec data-scrolly
    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer.observe(item);
    }
  }

  /**
   * Méthode d'observation
   */
  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      // Si l'objet entre dans la fenêtre de l'écran les objets apparaissent
      if (entry.isIntersecting) {
        target.classList.add('is-active');
        // Permet d'animer les objets seulements une fois
        if (target.getAttribute('data-no-repeat') == 'no-repeat') {
          observer.unobserve(target);
        }
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
