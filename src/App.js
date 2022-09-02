import { useState } from 'react';
import { FiDollarSign, FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer test_120b79d627dea6d5cf1a4306959ec7");
  myHeaders.append("Cookie", "PHPSESSID=tmeagm6v2l53u9gbgcgmqrkicv");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://api.api-futebol.com.br/v1/campeonatos/10/fases/168", requestOptions)
    .then(response => response.json())
    .then(rodadas => console.log(rodadas.chaves[0].partida_ida.placar))
    .catch(error => console.log('error', error));

  const [input, setInput] = useState('')
  const [rodada, setRodada] = useState({})

  async function handleSearch() {

    if (input === '') {
      alert("Preencha alguma fase!!")
      return;
    }

    try {
      const response = await api.get(`campeonatos/10/fases/${input}`);
      setRodada(response.data)
      setInput("")

    } catch {
      alert("Ops, erro ao buscar aqui...")
      setInput("")
    }

  }


  return (
    <div className="App">
      <h1 className='header'><FiDollarSign size={25} color="#fff" />ITA Bet</h1>
      <span className='title'>Escolha a partida: </span>
      <div className='container'>
        <input
          type="text"
          placeholder="Buscar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(rodada).length > 0 && (
        <main className="main">
          <h2>Rodada: {rodada.rodada}</h2>

          <span>{rodada.chaves.partida_ida['placar']}</span>
          <span>Placar: {rodada}</span>
          <span>{rodada.placar_mandante} - {rodada.placar_visitante}</span>
          <span>{rodada.proxima_fase.fase_id}</span>

        </main>
      )}
    </div>
  );
}

export default App;
