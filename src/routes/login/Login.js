import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  render() {
    return (
      <div>
        <h2>Innskráning</h2>
        <form method='POST'>
          <label>Notendanafn: </label>
          <input type='text'/>
          <label>Lykilorð: </label>
          <input type='password'/>
          <Button children='Innskrá'/>
        </form>
        <Link to='/register'>Nýskráning</Link>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Login;
