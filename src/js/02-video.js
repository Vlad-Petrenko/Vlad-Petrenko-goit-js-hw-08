import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

function onPlay(data) {
  let timePlayVideo = data.seconds;

  localStorage.setItem('videoplayer - current - time', timePlayVideo);
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
