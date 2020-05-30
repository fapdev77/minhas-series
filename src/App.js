import React from 'react';
import Header from './Header';
//gerenciando o sistema de rotas com react-router-dom
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//fake routes para testes
const Home = () => {
  return <h1>Home</h1>
};

const Generos = () => {
  return <h1>Gêneros</h1>
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route exact path='/' component={Home} />
        <Route path='/generos' component={Generos} />
      </div>
    </Router>
  );
};

export default App;
