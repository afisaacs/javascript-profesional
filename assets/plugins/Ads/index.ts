import MediaPlayer from '../../MediaPlayer';
import Ads from './Ads'

class AdsPlugin {
  private ads: Ads;
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private lastRenderAdTime: number;
  private adsContainer: HTMLElement;

  constructor() {
    this.ads = Ads.getInstance();
    this.adsContainer = document.createElement('div');
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  run(player: MediaPlayer) {
    this.player = player;
    this.player.container.appendChild(this.adsContainer);
    this.media = this.player.media;
    this.media.addEventListener('timeupdate', this.handleTimeUpdate);
  }

  private handleTimeUpdate () {
    const currentTime = Math.floor(this.media.currentTime);
    if (this.lastRenderAdTime === currentTime) {
      return;
    }
    this.lastRenderAdTime = currentTime;
    if (currentTime % 30 === 0) {
      this.renderAd();
    }
  }

  private renderAd() {
    const ad = this.ads.getAd();
    this.adsContainer.innerHTML = `
    <div class="ads">
      <a  class="ads__link" href="${ad.url}" target="_blank">
        <img class="ads__img" src="${ad.imageUrl}" />
        <div class="ads__info">
          <h5 class="ads__title">${ad.title}</h5>
          <p class="ads__body">${ad.body}</p>
        </div>
      </a>
    </div>`;
    setTimeout(() => this.adsContainer.innerHTML = '', 10000);
  }
}

export default AdsPlugin;