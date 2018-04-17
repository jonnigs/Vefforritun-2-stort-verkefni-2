import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
      offset: 0,
    };

    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  setOffset() {
    const query = '';
  }

  async componentDidMount() {
    this.setOffset();
    try {
      const data = await get('/users');
      this.setState({ data, loading: false });
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
    const { data, loading, offset } = this.state;

    let fyrriTakki = '';
    if (Number(this.state.offset) !== 0) {
      fyrriTakki = <Button onClick={this.handleBack} children='Fyrri síða'/>;
    }

    if (loading) {
      return (<p>Hleð notendum...</p>);
    }

    /*if (error) {
      return (<p>Villa við að hlaða bókum</p>);
    }*/

    const gogn = this.state.data.items.map((user) => {
      return (
        <div>
          <strong>
            <Link to={'/users/' + user.id}>{user.username}</Link>
          </strong>
        </div>
      )
    })

    return (
      <div>
        <h2>Notendur</h2>
        {gogn}
        {fyrriTakki}
        <p>Síða {(Number(this.state.offset)/10) + 1}</p>
        <Button onClick={this.handleNext} children='Næsta síða'/>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Users;
