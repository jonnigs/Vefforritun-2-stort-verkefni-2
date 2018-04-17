import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get } from '../../api';

import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './Me.css';

class Me extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      offset: 0,
    };
  }

  async componentDidMount() {
    try {
      const data = await get('/users/me');
      this.setState({ data, loading: false });
      console.log(data);
    } catch (error) {
      console.error('Error fetching users', error);
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { data, loading, offset } = this.state;

    if (loading) {
      return (<p>Hleð notendum...</p>);
    }

    /*if (error) {
      return (<p>Villa við að hlaða bókum</p>);
    }*/


    return (
      <div>
        <h2>Ég</h2>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Me;
