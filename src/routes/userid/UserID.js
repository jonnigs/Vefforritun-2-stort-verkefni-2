import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get } from '../../api';

import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './UserID.css';
import '../../profile.jpg';

class UserID extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      userReadData: null,
      bokaNofn: [],
      loading: true,
      offset: 0,
    };
  }

  async componentDidMount() {
    const params = window.location.pathname;
    const butad = params.split('/');
    const id = butad[2];
    try {
      const userData = await get('/users/'+ id);
      const userReadData = await get('/users/'+ id + '/read');
      if (userReadData.items.length > 0) {
        for (let i = 0; i < userReadData.items.length; i += 1) {
          const res = await get('/books/'+ userReadData.items[i].book_id);
          let bokaNofn = this.state.bokaNofn;
          bokaNofn.push(res.title);
          this.setState({bokaNofn});
        }
      }
      this.setState({ userData, userReadData, loading: false });
    } catch (error) {
      console.error('Error fetching users', error);
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { userData, userReadData, bokaNofn, loading, offset } = this.state;

    if (loading) {
      return (<p>Hleð notanda...</p>);
    }

    /*if (error) {
      return (<p>Villa við að hlaða bókum</p>);
    }*/

    let mynd = '';
    if (!userData.image) {
      mynd = <img src='../../profile.jpg'/>
    }

    let lestur = <h2>Enginn skráður lestur hjá notanda</h2>;
    let lesnarBaekur = '';
    let counter = -1;
    if(userReadData.items.length > 0) {
      lestur = <h2>Lesnar bækur</h2>
      lesnarBaekur = this.state.userReadData.items.map((bok) => {
        counter += 1;
        return (
          <div>
          <Link to={'/books/' + bok.book_id}><p>{this.state.bokaNofn[counter]}</p></Link>
          <p>Einkunn: {bok.rating}</p>
          <p>{bok.review}</p>
          </div>
        )
      })
    }


    return (
      <div>
        {mynd}
        <h2>{userData.name}</h2>
        {lestur}
        {lesnarBaekur}
      </div>
    );
  }
}

/* todo tengja við redux */

export default UserID;
