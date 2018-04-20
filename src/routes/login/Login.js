import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginPost } from '../../api';

import Button from '../../components/button';

import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { user, token, error } = await loginPost(this.state.username, this.state.password);
    if (error) {
      this.setState({message: error});
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.assign('/');
    }
  }

  render() {
    const { username, password, message } = this.state;

    if (localStorage.getItem('user')) {
      return (<p>Þú ert nú þegar innskráður notandi</p>)
    }

    return (
      <div className='meginmal'>
        <h1>Innskráning</h1>
        <p className='villur'>{message}</p>
        <form className='loginForm'>
          <label>Notendanafn:
            <input type='text' value={username} onChange={this.handleUsernameChange}/>
          </label>
          <label>Lykilorð:
            <input type='password' value={password} onChange={this.handlePasswordChange}/>
          </label>
          <Button onClick={this.handleSubmit} children='Innskrá'/>
        </form>
        <Link to='/register'>Nýskráning</Link>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Login;
