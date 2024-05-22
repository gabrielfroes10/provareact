import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [advice, setAdvice] = useState('');

  function fetchAdvice(keyword = '') {
    let url = 'https://api.adviceslip.com/advice';
    if (keyword) {
      url = `https://api.adviceslip.com/advice/search/${keyword}`;
    }
    axios.get(url)
      .then(response => {
        if (keyword) {
          const data = response.data.slips;
          if (data && data.length > 0) {
            setAdvice(data[0].advice);
          } else {
            setAdvice(`Nenhum conselho encontrado para "${keyword}".`);
          }
        } else {
          setAdvice(response.data.slip.advice);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar conselho:', error);
        setAdvice("Ocorreu um erro ao buscar o conselho.");
      });
  }

  return (
    <div>
      <h1>Conselhos</h1>
      <div>{advice}</div>
      <button onClick={() => fetchAdvice('dog')}>Dog</button>
      <button onClick={() => fetchAdvice('cat')}>Cat</button>
      <button onClick={() => fetchAdvice('study')}>Study</button>
      <button onClick={() => fetchAdvice()}>Random</button>
    </div>
  );
}

export default App;



