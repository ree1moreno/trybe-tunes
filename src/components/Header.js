import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../pages/img/login-logo.png';
import profile from '../pages/img/profile-avatar.png';
import Loading from '../pages/Loading';
import './header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.printName();
  }

  async printName() {
    this.setState({
      loading: true,
    });
    const namePrinted = await getUser();
    // console.log(namePrinted);
    // console.log(namePrinted.name);
    this.setState({
      loading: false,
      userName: namePrinted.name,
    });
  }

  render() {
    const { userName, loading } = this.state;
    // console.log(userName);
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div>
        <header className="header-container" data-testid="header-component">
          <img className="logo-header" src={ logo } alt="logo TrybeTunes" />
          <div className="user-box">
            <img className="profile-avatar" src={ profile } alt="avatar" />
            <p className="user-name" data-testid="header-user-name">{ userName }</p>
          </div>
        </header>
        <nav className="nav-bar">
          <Link to="/search" data-testid="link-to-search">Buscar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
