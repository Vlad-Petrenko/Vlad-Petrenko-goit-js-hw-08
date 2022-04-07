import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

function onPlay(event) {
  let timePlayVideo = event.seconds;

  localStorage.setItem('videoplayer - current - time', JSON.stringify(timePlayVideo));
}
haveCurrentTime();
player.on('timeupdate', throttle(onPlay, 1000));

function haveCurrentTime() {
  let savedCurrentTime = localStorage.getItem('videoplayer - current - time');

  if (savedCurrentTime) {
    player.setCurrentTime(savedCurrentTime).catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
  }
}
