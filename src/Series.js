import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Series = () => {
  const [data,setData] = useState([]);
  useEffect(() => {
    axios.get('/api/series').then(res => {
      setData(res.data.data);
    });
  },[]);

  // função para gerar a lista de generos na tabela para ser usado com o map
  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
        <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
        <Link to={'/series/' + record.id} className='btn btn-warning'>Info</Link>
        </td>
      </tr>
    );
  }

  // função para deletar o id, vamos pegar o record.id e passar para essa função.
  const deleteSerie = id => {
    axios.delete('/api/series/'+id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  }
  //caso não tenhamos registros, exibe uma mensagem
  if (data.length === 0 ) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link className='btn btn-primary' to='/series/novo'>Nova Série</Link>
        <div className='alert alert-warning' role='alert'>
          Não existem Séries cadastradas.
        </div>
      </div>
    );
  }  

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link className='btn btn-primary' to='/series/novo'>Nova Série</Link>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </table>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default Series;