import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get, profilePatch, profileMyndPost } from '../../api';

import Button from '../../components/button';

import './Profile.css';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      id: '',
      password: '',
      password2: '',
      name: '',
      message: '',
      lestur: <p>Engar bækur hafa verið lesnar</p>,
    };

    this.handleMyndChange = this.handleMyndChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePassword2Change = this.handlePassword2Change.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.changeMynd = this.changeMynd.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  handleMyndChange(e) {
    this.setState({file: e.target.files[0]});
    console.log(e);
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handlePassword2Change(e) {
    this.setState({password2: e.target.value});
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  async componentDidMount() {
    const res = await get('/users/me/read');
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({name: user.name, id: user.id});
    if (res.items.length > 0) {
      const data = res.items.map((bok) => {
        return (
          <div className='hverBok'>
            <h3>
              <Link to={'/books/' + bok.book_id}>{bok.title}</Link>
            </h3>
            <p>Einkunn: {bok.rating}</p>
            <p>Þín umsögn: {bok.review}</p>
            <Button children='Eyða lestri'/>
          </div>
        )
      })
      this.setState({lestur: data});
    }
  }

  async changeMynd(e) {
    e.preventDefault();
    const fil = document.getElementById("mynd");
    console.log(fil.value);
    const res = await profileMyndPost(this.fileInput.files[0], fil.value, this.state.id);
    if (res.error) {
      this.setState({message: 'Ekki tókst að lesa mynd'})
    } else {
      this.setState({message: 'Ný profilemynd hefur verið sett'})
    }
    console.log(res);
  }

  async changeName(e) {
    e.preventDefault();
    const res = await profilePatch(this.state.name, false, this.state.id);
    const user = JSON.parse(localStorage.getItem('user'));
    user.name = this.state.name;
    localStorage.removeItem("user");
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({message: <p>Nafn hefur verið uppfært</p>});
  }

  async changePassword(e) {
    e.preventDefault();
    if (this.state.password === this.state.password2 && this.state.password !== '') {
      const res = await profilePatch(false, this.state.password, this.state.id);
      this.setState({message: <p>Lykilorð hefur verið uppfært</p>})
    } else {
      this.setState({message: <p>Lykilorð stemma ekki</p>})
    }
  }

  render() {
    const { mynd, password, password2, name, message, lestur } = this.state;

    let villuskilaboð = '';
    if (!localStorage.getItem('user')) {
      villuskilaboð = <p>Þú ert ekki innskráður notandi, hægt er að <Link to='/login'>skrá sig inn hér</Link> eða <Link to='/register'>nýskrá sig hér.</Link></p>
    }
    let form = '';
    if (localStorage.getItem('user')) {
      form =  <div className='profileForm'>
                <form className='profileMynd'>
                  <input type='file' ref={input => {this.fileInput = input;}} id='mynd'/>
                  <Button onClick={this.changeMynd} children='Uppfæra mynd'/>
                </form>
                <form className='profileName'>
                  <label className='nameLabel'>Nafn:
                    <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
                  </label>
                  <Button onClick={this.changeName} children='Uppfæra nafn'/>
                </form>
                <form className='profilePass'>
                  <label className='passLabel'>Lykilorð:
                    <input type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                  </label>
                  <br />
                  <label className='passLabel'>Lykilorð, aftur:
                    <input type='password' value={this.state.password2} onChange={this.handlePassword2Change}/>
                  </label>
                  <Button onClick={this.changePassword} children='Uppfæra lykilorð'/>
                </form>
              </div>
    }

    return (
      <div className='meginmal'>
        <h1>Upplýsingar</h1>
        {villuskilaboð}
        <p>{this.state.message}</p>
        {form}
        <h1 className='profileLesnar'>Lesnar bækur</h1>
        <div>{this.state.lestur}</div>
      </div>
    );
  }
}

export default Profile
