const theHours = document.querySelector('.hours');
const theMinutes = document.querySelector('.minutes');
const theSeconds = document.querySelector('.seconds');
const theDate = document.querySelector('.date');

let globalDate = new Date();

setInterval(() => {
  let date = new Date();

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  theHours.textContent = `${hour}`.padStart(2, '0');
  theMinutes.textContent = `${minutes}`.padStart(2, '0');
  theSeconds.textContent = `${seconds}`.padStart(2, '0');
}, 1000);

const formattedMonth = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
}).format(globalDate);

const formattedWeek = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
}).format(globalDate);

theDate.textContent = `${formattedWeek}, ${formattedMonth} ${globalDate.getDay()}, ${globalDate.getFullYear()}`;
