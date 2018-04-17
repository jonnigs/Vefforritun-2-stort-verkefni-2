import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get } from '../../api';

import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './UserID.css';

class UserID extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      userReadData: null,
      loading: true,
      offset: 0,
    };

    this.handleFetchogMap = this.handleFetchogMap.bind(this);
  }

  async componentDidMount() {
    const params = window.location.pathname;
    const butad = params.split('/');
    const id = butad[2];
    try {
      const userData = await get('/users/'+ id);
      const userReadData = await get('/users/'+ id + '/read');
      console.log(userReadData);
      console.log(userData);
      this.setState({ userData, userReadData, loading: false });
    } catch (error) {
      console.error('Error fetching users', error);
      this.setState({ error: true, loading: false });
    }
  }

  handleFetchogMap() {
    const bokanofn = this.state.userReadData.items.map(async (bok) => {
      const bokData = await get('/books/'+ bok.book_id);
      console.log(bokData);
      return (
        <div>
        <Link to={'/books/' + bok.book_id}><p>{bokData.name}</p></Link>
        <p>Einkunn: {bok.rating}</p>
        <p>{bok.review}</p>
        </div>
      )
    })
    return bokanofn;
  }

  render() {
    const { userData, userReadData, loading, offset } = this.state;

    if (loading) {
      return (<p>Hleð notendum...</p>);
    }

    /*if (error) {
      return (<p>Villa við að hlaða bókum</p>);
    }*/

    let mynd = '';
    if (!userData.image) {
      mynd = <img src='../../../public/profile'/>
    }

    let lestur = <h2>Enginn skráður lestur hjá notanda</h2>;
    if(userReadData.items.length > 0) {
      lestur = this.handleFetchogMap;
    }

    return (
      <div>
        {mynd}
        <h2>{userData.name}</h2>
        {lestur}
      </div>
    );
  }
}

/* todo tengja við redux */

export default UserID;
