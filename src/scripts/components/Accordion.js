/** Composante Accordion de TimTools */
export default class Accordion {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur laquel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.headers = this.element.querySelectorAll('.js-header');
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    let nbData = 0;

    for (let i = 0; i < this.headers.length; i++) {
      const header = this.headers[i];
      header.addEventListener('click', this.onToggle.bind(this));

      // Ouvre l'accordion à l'ouverture de la page si il y a le dataset auto-open
      if ('autoOpen' in header.dataset) {
        header.classList.add('is-active');
        nbData++;
      }
    }

    // Si il y a plus d'un accordion d'ouvert à l'ouveture de la page, le dataset not-closing est appliquer sur le conteneur
    if (nbData > 1) {
      this.element.dataset.notClosing = '';
    }
  }

  /**
   * method onToggle
   * @return {HTMLElement} Permet de toggle la classe is-active des accordions
   */
  onToggle(event) {
    // Si le dataset not-closing se trouve sur le conteneur, les accordions ne se ferme pas automatiquement à l'ouverture d'un
    if (!('notClosing' in this.element.dataset)) {
      for (let i = 0; i < this.headers.length; i++) {
        const header = this.headers[i];
        header.classList.remove('is-active');
      }
    }

    event.currentTarget.classList.toggle('is-active');
  }
}
