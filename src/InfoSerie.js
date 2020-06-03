import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [form,setForm] = useState({
    name:''
  });
  const [success,setSuccess] = useState(false);
  const [mode,setMode] = useState('INFO');
  const [genres,setGenres] = useState([]);
  const [genreId,setGenreId] = useState('');

  //carregar os dados
  const [data,setData] = useState({});

  useEffect(() => {
    axios.get('/api/series/' + match.params.id).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  },[match.params.id]);

  useEffect(() => {
    axios.get('/api/genres').then(res => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find(value => data.genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id)
      }
    });
  },[data]);

  // custom header
  const masterHeader = {
    height:'50vh',
    minHeight:'400px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition:'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  }
  const onChange = field => evt => {
    setForm(
      {
        ...form,
        [field]:evt.target.value
    });
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    });
  };

  const save = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id:genreId })
      .then(res => {
        console.log(res);
        setSuccess(true);
      });
  }

  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ 'background': 'rgba(0,0,0,0.7)'}}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                  <div className='lead text-white'>
                    { data.status === 'ASSISTIDO' && <Badge style={{'margin':'2px'}} color='success'>Assistido</Badge> }
                    { data.status === 'NAO_ASSISTIDO' && <Badge style={{'margin':'2px'}} color='warning'>Não Assistido</Badge> }
                    Gênero: {data.genre}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button type='button' className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
      </div>
      {
        /* Comment: Este metodo valida se o resultado de uma expressão for verdadeiro/falso
        e não executa o trecho de codigo abaixo dele caso seja falso*/
        mode === 'EDIT' &&

        <div className='container'>
          <h1>Info Série</h1>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome </label>
              <input 
                type='text' 
                className='form-control' 
                id='name' 
                placeholder='Nome da Série'
                value={form.name}
                onChange={onChange('name')}
              />
              <label htmlFor='comments'>Comentários </label>
              <input 
                type='text' 
                className='form-control' 
                id='comments' 
                placeholder='Comentários'
                value={form.comments}
                onChange={onChange('comments')}
              />

              <div className='form-group'>
                <label htmlFor='name'>Gênero: </label>
                <select className='form-control' onChange={onChangeGenre} value={genreId}>
                  { genres.map(genre => <option key={genre.id} value={genre.id}> {genre.name} </option>) }
                </select>
              </div>

              <div className='form-check'>
                <input className='form-check-imput' type='radio' name='status' checked={form.status === 'ASSISTIDO'} id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')} />
                <label className='form-check-label' htmlFor='assistido' >
                  Assistido
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-imput' type='radio' name='status' checked={form.status === 'NAO_ASSISTIDO'} id='naoAssistido' value='NAO_ASSISTIDO' onChange={seleciona('NAO_ASSISTIDO')} />
                <label className='form-check-label' htmlFor='naoAssistido' >
                  Não Assistido
                </label>
              </div>

            </div>
            <button type='button' className='btn btn-primary' onClick={save} style={{'margin':'2px'}}> Salvar </button>
            <button type='button' className='btn btn-primary' onClick={() => setMode('INFO')}> Cancelar </button>
          </form>
        </div>

      }

    </div>
  );
}

export default InfoSerie;