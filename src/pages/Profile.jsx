import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        Seu perfil
        <Footer />
      </div>
    );
  }
}

export default Profile;
