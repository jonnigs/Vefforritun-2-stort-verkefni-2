import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '../button';

import './Header.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchChange(e) {
    this.setState({search: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    window.location.assign('/books?search=' + this.state.search);
  }

  render() {
    const { search } = this.state;
    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
        <form>
          <input type='text' value={this.state.search} onChange={this.handleSearchChange}/>
          <Button onClick={this.handleSubmit} children='Leita' />
        </form>
        <Link to="/login" className='nav'>Innskráning</Link>
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
