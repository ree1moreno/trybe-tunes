import React from 'react';
import './loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }
}

export default Loading;
