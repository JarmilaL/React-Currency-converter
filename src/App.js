// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react';

export default function App() {
  const [currencies, setCurrencies] = useState(['USD', 'EUR']);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [value, setValue] = useState(1);

  useEffect(function () {
    async function fetchCurrencies() {
      const response = await fetch('https://api.frankfurter.app/currencies');
      const data = await response.json();

      setCurrencies(Object.entries(data).map(([key, value]) => key));
    }

    fetchCurrencies();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <CurrencySelect
        currencies={currencies}
        handleSetCurrency={setCurrency1}
        currency={currency1}
      />
      <CurrencySelect
        currencies={currencies}
        handleSetCurrency={setCurrency2}
        currency={currency2}
      />
      <Output currency1={currency1} currency2={currency2} value={value} />
    </div>
  );
}

function CurrencySelect({ currencies, handleSetCurrency, currency }) {
  return (
    <select
      value={currency}
      onChange={(event) => handleSetCurrency(event.target.value)}
    >
      {currencies.map((cur) => (
        <option value={cur} key={cur}>
          {cur}
        </option>
      ))}
    </select>
  );
}

function Output({ currency1, currency2, value }) {
  const [result, setResult] = useState(1);

  useEffect(
    function () {
      async function fetchConversion() {
        try {
          const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${value}&from=${currency1}&to=${currency2}`
          );
          const data = await response.json();

          setResult(data.rates[currency2]);
        } catch (error) {
          console.log(error.message);
        }
      }

      if (currency1 === currency2) return setResult(value);
      fetchConversion();
    },
    [currency1, currency2, value]
  );

  return <p>{result}</p>;
}
