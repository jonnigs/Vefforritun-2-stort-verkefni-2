import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { get, profilePatch, profileMyndPost, lesturDelete } from '../../api';

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
    this.eydaLestri = this.eydaLestri.bind(this);
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

  async eydaLestri(readid) {
    const res = await lesturDelete(readid, this.state.id );
    if (res.error) {
      this.setState({message: <p className='villur'>Ekki tókst að eyða lestri</p>})
    } else {
      document.getElementById(readid).style.display = "none";
    }
  }

  async componentDidMount() {
    const res = await get('/users/me/read');
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({name: user.name, id: user.id});
    if (res.items.length > 0) {
      const data = res.items.map((bok) => {
        return (
          <div className='hverBok' key={bok.id} id={bok.id}>
            <h3>
              <Link to={'/books/' + bok.book_id}>{bok.title}</Link>
            </h3>
            <p>Einkunn: {bok.rating}</p>
            <p>Þín umsögn: {bok.review}</p>
            <Button className='carefull' onClick={() => this.eydaLestri(bok.id)} children='Eyða lestri'/>
          </div>
        )
      })
      this.setState({lestur: data});
    }
  }

  async changeMynd(e) {
    e.preventDefault();
    const fil = document.getElementById("mynd");
    const res = await profileMyndPost(this.fileInput.files[0], fil.value, this.state.id);
    if (res.error) {
      this.setState({message: <p className='villur'>Ekki tókst að lesa mynd</p>})
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      user.image = res.image;
      localStorage.removeItem("user");
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({message: <p className='success'>Ný profilemynd hefur verið sett</p>});
    }
  }

  async changeName(e) {
    e.preventDefault();
    let res = {};
    if (this.state.name !== '') {
      res = await profilePatch(this.state.name, false, this.state.id);
    }
    if (res.errors || this.state.name === '') {
      this.setState({message: <p className='villur'>Ekki tókst að breyta nafni</p>})
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      user.name = this.state.name;
      localStorage.removeItem("user");
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({message: <p className='success'>Nafn hefur verið uppfært</p>});
    }
  }

  async changePassword(e) {
    e.preventDefault();
    if (this.state.password === this.state.password2 && this.state.password !== '') {
      const res = await profilePatch(false, this.state.password, this.state.id);
      if (res.errors) {
        this.setState({message: <p className='villur'>Ekki tókst að uppfæra lykilorð</p>})
      } else {
        this.setState({message: <p className='success'>Lykilorð hefur verið uppfært</p>})
      }
    } else {
      this.setState({message: <p className='villur'>Lykilorð stemma ekki</p>})
    }
  }

  render() {
    const { password, password2, name, message, lestur } = this.state;

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
                    <input type='text' value={name} onChange={this.handleNameChange}/>
                  </label>
                  <Button onClick={this.changeName} children='Uppfæra nafn'/>
                </form>
                <form className='profilePass'>
                  <label className='passLabel'>Lykilorð:
                    <input type='password' value={password} onChange={this.handlePasswordChange}/>
                  </label>
                  <br />
                  <label className='passLabel'>Lykilorð, aftur:
                    <input type='password' value={password2} onChange={this.handlePassword2Change}/>
                  </label>
                  <Button onClick={this.changePassword} children='Uppfæra lykilorð'/>
                </form>
              </div>
    }

    return (
      <div className='meginmal'>
        <Helmet title="Prófíll" />
        <h1>Upplýsingar</h1>
        {villuskilaboð}
        {message}
        {form}
        <h1 className='profileLesnar'>Lesnar bækur</h1>
        <div>{lestur}</div>
      </div>
    );
  }
}

export default Profile
