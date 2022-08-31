import { FiDollarSign } from 'react-icons/fi';
import './styles.css';

function App() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer live_242f98f04e09c66c46fe7032e36551");
  myHeaders.append("Cookie", "PHPSESSID=tmeagm6v2l53u9gbgcgmqrkicv");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://api.api-futebol.com.br/v1/campeonatos/10/fases/168", requestOptions)
    .then(response => response.json())
    .then(rodadaAtual => console.log(rodadaAtual.campeonato.rodada_atual.slug))
    .then(response => response.json())
    .then(rodadas => console.log(rodadas.partidas['25a-rodada']))
    .catch(error => console.log('error', error));

  return (
    <div className="App">
      <h1 className='header'><FiDollarSign size={25} color="#fff" />ITA Bet</h1>
      <div className='container'>
        <h4 className='title'>Escolha a partida: </h4>
        
      </div>
    </div>
  );
}

export default App;
