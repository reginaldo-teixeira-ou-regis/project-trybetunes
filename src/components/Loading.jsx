import { Component } from 'react';
import '../styles/Loading.css';
import Load from '../images/loading.svg';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={ Load } alt="" />
        <h2>Carregando...</h2>
      </div>
    );
  }
}

export default Loading;
