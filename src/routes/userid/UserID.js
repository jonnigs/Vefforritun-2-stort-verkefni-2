import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { get } from '../../api';

import './UserID.css';
import '../../profile.jpg';

class UserID extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userData: null,
      userReadData: null,
      bokaNofn: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const params = window.location.pathname;
    const butad = params.split('/');
    const id = butad[2];
    if (isNaN(id) && id !== 'me') {
      this.setState({error: true});
    }
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
    const { error, userData, userReadData, bokaNofn, loading } = this.state;

    if (loading) {
      return (<p>Hleð notanda...</p>);
    }

    if (error) {
      return (<p>Villa við að hlaða notanda</p>);
    }

    let mynd = '';
    if (!userData.image) {
      mynd = <img className='myndAProfile' alt='engin prófílmynd' src='../../profile.jpg'/>
    } else {
      mynd = <img className='myndAProfile' alt='prófílmtnd' src={userData.image}/>
    }

    let lestur = <h2 className='lestrarHeading'>Enginn skráður lestur hjá notanda</h2>;
    let lesnarBaekur = '';
    let counter = -1;
    if(userReadData.items.length > 0) {
      lestur = <h2 className='lestrarHeading'>Lesnar bækur</h2>
      lesnarBaekur = userReadData.items.map((bok) => {
        counter += 1;
        return (
          <li key={bok.id} className='stakurLestur'>
            <Link to={'/books/' + bok.book_id}><h3>{bokaNofn[counter]}</h3></Link>
            <p>Einkunn: {bok.rating}</p>
            <p>{bok.review}</p>
          </li>
        )
      })
    }


    return (
      <div className='meginmal'>
        <Helmet title={userData.name} />
        <div className='profileDiv'>
          {mynd}
          <h2 className='notendaNafn'>{userData.name}</h2>
        </div>
        <div className='lestrarDiv'>
          {lestur}
          <ul>
            {lesnarBaekur}
          </ul>
        </div>
      </div>
    );
  }
}

/* todo tengja við redux */

export default UserID;
