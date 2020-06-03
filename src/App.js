import React from 'react';
// Import dos componentes
import Header from './Header';
import Generos from './Generos';
import NovoGenero from './NovoGenero';
import EditarGenero from './EditarGenero';
import Series from './Series';
import NovaSerie from './NovaSerie';
import InfoSerie from './InfoSerie';

//gerenciando o sistema de rotas com react-router-dom
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

//fake routes para testes
const Home = () => {
  return (  
  <div className='container'>
    <h1>Minhas Séries - Home</h1>
  </div>
)};


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/generos' component={Generos} />
          <Route exact path='/generos/novo' component={NovoGenero} />
          <Route exact path='/genero/:id' component={EditarGenero} />
          <Route exact path='/series' component={Series} />
          <Route exact path='/series/novo' component={NovaSerie}/>
          <Route exact path='/series/:id' component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
