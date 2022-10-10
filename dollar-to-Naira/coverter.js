const btnConvert = document.querySelector('.btn');
const dollarvalue = document.querySelector('.dollar__value');
const messages = document.querySelector('.message');
const currentRate = document.querySelector('.current__rate');
let nairaRate;
let globalApi = '';

nairaRate = currentRate.textContent = '';

const helperFunction = function () {
  const apiFunction = async function () {
    //CALLING THE API
    const apiCall = await fetch(`https://api.exchangerate.host/latest`);
    //STORING/AWAITING PROMISE
    const response = await apiCall.json();

    nairaRate = response.rates.NGN;
  };

  apiFunction();
};

helperFunction();

//LIVE-TIME AND LIVE EXCHANGE RATE
setInterval(() => {
  const date = new Date();
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);

  const weekday = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(date);

  const year = date.getFullYear();
  const day = `${date.getDate()}`.padStart(2, '0');

  const timeHour = `${date.getHours()}`.padStart(2, '0');
  const timeMinutes = `${date.getMinutes()}`.padStart(2, '0');
  const timeSeconds = `${date.getSeconds()}`.padStart(2, '0');

  currentRate.textContent = `Today, ${weekday}, ${day} ${month}, ${year}. ${timeHour}:${timeMinutes}:${timeSeconds}, $1 is equal ${+nairaRate.toFixed(
    2
  )}`;
}, 1000);

const convertCall = async function () {
  try {
    //API CALL
    const apiCall = await fetch(`https://api.exchangerate.host/latest`);

    //PROMISE AWAITING/STORAGE
    const response = await apiCall.json();

    nairaRate = response.rates.NGN;

    if (!apiCall.ok) return new Error('Cannot get Data currently');

    const divElement = document.createElement('div');

    // if (dollarvalue.value * dollarvalue.value !== Number) return;
    if (
      isNaN(response.rates.NGN * dollarvalue.value) ||
      response.rates.NGN * dollarvalue.value === 0
    ) {
      divElement.textContent = `Please input a number, ${dollarvalue.value} is NOT a number`;
      messages.append(divElement);
    } else {
      const theConvertedRate = (response.rates.NGN * dollarvalue.value).toFixed(
        2
      );

      divElement.textContent = `The ${dollarvalue.value} USD is equivalent to ${theConvertedRate} NGN`;

      //DISPLAYING THE EXCHANGED RATE
      messages.append(divElement);
    }

    //REMOVING PREVIOUS INPUT VALUE
    if (messages.childNodes.length >= 2)
      messages.childNodes[0].parentNode.removeChild(messages.childNodes[0]);

    //CLEARING THE INPUT FIELD
    dollarvalue.value = '';
  } catch (err) {
    messages.append(err.message);
  }
};

btnConvert.addEventListener('click', convertCall);
