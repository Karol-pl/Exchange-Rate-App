const currencyOne = document.querySelector("#currency-one");
const amountOne = document.querySelector("#amount-one");
const currencyTwo = document.querySelector("#currency-two");
const amountTwo = document.querySelector("#amount-two");
const swapBtn = document.querySelector(".swap");
const rateInfo = document.querySelector(".rate-info");

const calc = () => {
  fetch(`http://api.nbp.pl/api/exchangerates/tables/a/`)
    .then((res) => res.json())
    .then((data) => {
      const currency1 = currencyOne.value;
      const currency2 = currencyTwo.value;

      let rates = data[0].rates.map((rate) => rate);
      let rateList = [
        {
          code: "PLN",
          currency: "złoty polski",
          mid: 1,
        },
        ...rates,
      ];

      let currencies = [...rateList];
      let usedCurrency1 = currencies.find((rate) => rate.code == currency1);
      let usedCurrency2 = currencies.find((rate) => rate.code == currency2);

      let calcRate = usedCurrency1.mid / usedCurrency2.mid;
      rateInfo.textContent = `1 ${currency1} = ${calcRate.toFixed(
        4
      )} ${currency2}`;
      amountTwo.value = (calcRate * amountOne.value).toFixed(2);
    });
};

const swap = () => {
  const prevValueOne = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = prevValueOne;
  calc();
};

currencyOne.addEventListener("change", calc);
currencyTwo.addEventListener("change", calc);
amountOne.addEventListener("input", calc);
swapBtn.addEventListener("click", swap);

calc();
