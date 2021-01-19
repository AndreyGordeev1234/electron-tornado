const ipc = require('electron').ipcRenderer;

const loadBtn = document.getElementById('load');
const textHeader = document.getElementById('text');
const timeText = document.getElementById('time');
const loadingText = document.getElementById('loading');
const errorText = document.getElementById('error');
const data = document.getElementById('data');
const imgTag = document.createElement('img');
const noDataText = document.getElementById('noData');

loadBtn.addEventListener('click', function () {
  noDataText.innerHTML = '';
  handleLoading();
  ipc.once('dataLoaded', function (event, response) {
    handleLoaded(response);
  });
  ipc.once('dataError', function (_, error) {
    hanldeError(error);
  });
  ipc.send('dataRequest', null);
});

function handleLoading() {
  textHeader.innerHTML = '';
  timeText.innerHTML = '';
  errorText.innerHTML = '';
  if (data.contains(imgTag)) data.removeChild(imgTag);
  loadingText.innerHTML = 'Loading...';
}

function handleLoaded({ text, date, img }) {
  errorText.innerHTML = '';
  loadingText.innerHTML = '';
  textHeader.innerHTML = text;
  timeText.innerHTML = `Текущее время: ${date}`;
  imgTag.src = `data:image/png;base64, ${img}`;
  data.appendChild(imgTag);
}

function hanldeError({ name, message }) {
  loadingText.innerHTML = '';
  textHeader.innerHTML = '';
  timeText.innerHTML = '';
  if (data.contains(imgTag)) data.removeChild(imgTag);
  errorText.innerHTML = `${name}:  ${message}`;
}
