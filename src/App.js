// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react';

export default function App() {
  const [currencies, setCurrencies] = useState(['USD', 'EUR']);

  useEffect(function () {
    async function getCurrencies() {
      const response = await fetch('https://api.frankfurter.app/currencies');
      const data = await response.json();

      setCurrencies(Object.entries(data).map(([key, value]) => key));
    }

    getCurrencies();
  }, []);

  return (
    <div>
      <input type="text" />
      <CurrencySelect currencies={currencies} />
      <CurrencySelect currencies={currencies} />
      <p>OUTPUT</p>
    </div>
  );
}

function CurrencySelect({ currencies }) {
  return (
    <select>
      {currencies.map((cur) => (
        <option value={cur} key={cur}>
          {cur}
        </option>
      ))}
    </select>
  );
}
