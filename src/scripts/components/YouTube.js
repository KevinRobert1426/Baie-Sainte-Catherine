export default class YouTube {
  /**
   * method constructor
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;

    this.videoContainer = this.element.querySelector('.js-video');
    this.poster = this.element.querySelector('.js-poster');
    this.videoId = this.element.dataset.videoId;
    this.autoplay = this.poster ? 1 : 0;
    this.playerReady = false;

    YouTube.instances.push(this);

    if (this.videoId) {
      YouTube.loadScript();
    } else {
      console.error('vous devez spécifiez un ID');
    }
  }

  /**
   * Méthode de chargement du script
   */
  static loadScript() {
    if (!YouTube.scriptIsLoading) {
      YouTube.scriptIsLoading = true;

      // On va cherhcer la bibliothèque de l'api de YouTube
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.initPlayer = this.initPlayer.bind(this);

    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer);
    } else {
      this.initPlayer();
    }
  }

  /**
   * Méthode d'initialisation du player
   * @param {Event} event - Événement de l'object qu'on sélectionne
   */
  initPlayer(event) {
    console.log(this);
    if (event) {
      this.element.removeEventListener('click', this.initPlayer);
    }

    // On établie les paramètre de base du lecteur vidéo
    this.player = new YT.Player(this.videoContainer, {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: {
        rel: 0,
        autoplay: this.autoplay,
        // récupère la valeur dans le dataset controls pour afficher ou non l'interface de YouTube
        controls: this.element.dataset.controls,
      },
      events: {
        onReady: () => {
          this.playerReady = true;

          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },

        onStateChange: (event) => {
          // Permet de mettre en pause les autres vidéos de la page quand une vidéo démarre
          if (event.data == YT.PlayerState.PLAYING) {
            YouTube.pauseAll(this);
          }
          // Permet à la vidéo de revenir au début quand elle finit
          else if (event.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }

  /**
   * method watch
   * @param {entries} entries - Permet de détecter les vidéos dans la page
   */
  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  static initAll() {
    document.documentElement.classList.add('is-video-ready');

    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      instance.init();
    }
  }

  static pauseAll(currentInstance) {
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}

YouTube.instances = [];
window.onYouTubeIframeAPIReady = YouTube.initAll;
