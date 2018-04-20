import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../api';

import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './Users.css';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
      offset: 0,
      counter: 0,
    };

    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  setOffset() {
    if (window.location.search) {
      const query = window.location.search;
      const lidad = query.split('=');
      this.setState({offset: lidad[1]});
    }
  }

  async componentDidMount() {
    await this.setOffset();
    try {
      const data = await get('/users?offset=' + this.state.offset);
      this.setState({ data, loading: false, counter: data.items.length });
    } catch (error) {
      console.error('Error fetching users', error);
      this.setState({ error: true, loading: false });
    }
  }

  handleBack(e) {
    const offset = Number(this.state.offset) - 10;
    window.location.assign('/users?offset=' + offset);
  }

  handleNext(e) {
    const offset = Number(this.state.offset) + 10;
    window.location.assign('/users?offset=' + offset);
  }

  render() {
    const { data, loading, error, offset, counter } = this.state;

    let fyrriTakki = '';
    if (Number(offset) !== 0) {
      fyrriTakki = <Button onClick={this.handleBack} children='Fyrri síða'/>;
    }

    let seinniTakki = <Button onClick={this.handleNext} children='Næsta síða'/>;
    if (counter < 10) {
      seinniTakki = '';
    }

    if (!localStorage.getItem('user')) {
      return (<p>Til að skoða þennan hluta vefsins þarft þú að vera innskráður notandi</p>);
    }

    if (loading) {
      return (<p>Hleð notendum...</p>);
    }

    if (error) {
      return (<p>Villa við að hlaða notendum</p>);
    }

    const gogn = data.items.map((user) => {
      return (
        <div className='notendaLinkar' key={user.id}>
          <strong>
            <Link to={'/users/' + user.id}>{user.username}</Link>
          </strong>
        </div>
      )
    })

    return (
      <div className='meginmal'>
        <h1 className='userHeading'>Notendur</h1>
        {gogn}
        <div className='takkaDiv'>
          {fyrriTakki}
          <p className='sida'>Síða {(Number(offset)/10) + 1}</p>
          {seinniTakki}
        </div>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Users;
