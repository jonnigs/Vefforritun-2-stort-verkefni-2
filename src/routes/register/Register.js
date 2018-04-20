import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { registerPost } from '../../api';

import Button from '../../components/button';

import './Register.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      message: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleMessages(mes) {
    if (mes === '200') {
      this.setState({
        username: '',
        password: '',
        nafn: '',
        message: <p className='success'>Nýskráning tókst, þú getur núna skráð þig inn á síðuna</p>,
      });
    } else {
      const message = mes.map((mess) => {
        return (
          <p className='villur'>{mess.message}</p>
        )
      });
      this.setState({
        message: message,
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const res = await registerPost(this.state.username, this.state.password, this.state.name);
    if (res.errors) {
      this.handleMessages(res.errors);
    } else {
      this.handleMessages('200');
    }
  }


  render() {
    const { username, password, name, message } = this.state;

    if (localStorage.getItem('user')) {
      return (<p>Þú ert nú þegar innskráður notandi</p>)
    }

    return (
      <div className='meginmal'>
        <Helmet title="Nýskráning" />
        <h2>Nýskráning</h2>
        {message}
        <form className='registerForm'>
          <label>Notendanafn:
            <input type='text' value={username} onChange={this.handleUsernameChange}/>
          </label>
          <label>Lykilorð:
            <input type='password' value={password} onChange={this.handlePasswordChange}/>
          </label>
          <label>Nafn:
            <input type='text' value={name} onChange={this.handleNameChange}/>
          </label>
          <Button onClick={this.handleSubmit} children='Nýskrá'/>
        </form>
        <Link to='/login'>Innskráning</Link>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Register;
