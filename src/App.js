import React, { useState, useEffect } from 'react';
// Import dos componentes
import Header from './Header';
import Generos from './Generos';
import NovoGenero from './NovoGenero';
import EditarGenero from './EditarGenero';

//gerenciando o sistema de rotas com react-router-dom
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// import do axios 
import axios from 'axios';

//fake routes para testes
const Home = () => {
  return <h1>Home</h1>
};


function App() {
  const [data,setData] = useState({});
  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data);
    })
  },[]);
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route exact path='/' component={Home} />
        <Route exact path='/generos' component={Generos} />
        <Route exact path='/genero/:id' component={EditarGenero} />
        <Route exact path='/generos/novo' component={NovoGenero} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
};

export default App;
