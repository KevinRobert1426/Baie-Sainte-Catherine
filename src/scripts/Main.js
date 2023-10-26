import Icons from './utils/Icons';
import ComponentFactory from './ComponentFactory';

class Main {
  constructor() {
    this.init();
  }

  init() {
    Icons.load();

    new ComponentFactory();

    document.documentElement.classList.add('has-js');
  }
}
new Main();
