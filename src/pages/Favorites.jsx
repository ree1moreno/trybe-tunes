import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Sua lista de músicas favoritas
        <Footer />
      </div>
    );
  }
}

export default Favorites;
