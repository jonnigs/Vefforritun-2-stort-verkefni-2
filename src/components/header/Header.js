import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '../button';

import './Header.css';
import '../../profile.jpg';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearLocal = this.clearLocal.bind(this);
  }

  handleSearchChange(e) {
    this.setState({search: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    window.location.assign('/books?search=' + this.state.search);
  }

  clearLocal(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.assign('/');
  }

  render() {
    const { search } = this.state;

    let profile = <Link to="/login" className='nav'>Innskráning</Link>;
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      profile = <div className='profilebox'>
                  <img className='profilepic' src='../../profile.jpg'/>
                  <div className='profilerest'>
                    <h3><Link to='/profile'>{user.name}</Link></h3>
                    <Button onClick={this.clearLocal} children='Logout' />
                  </div>
                </div>
    }
    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
        <form>
          <input type='text' value={this.state.search} onChange={this.handleSearchChange}/>
          <Button onClick={this.handleSubmit} children='Leita' />
        </form>
        {profile}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header);
