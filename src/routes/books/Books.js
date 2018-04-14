import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../api';

import Button from '../../components/button';

class Books extends Component {

  state = {
    data: null,
    loading: true,
  }

  async componentDidMount() {
  try {
    const data = await get('/books');
    this.setState({ data, loading: false });
  } catch (error) {
    console.error('Error fetching books', error);
    this.setState({ error: true, loading: false });
  }
}

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return (<p>Hleð bókum...</p>);
    }

    /*if (error) {
      return (<p>Villa við að hlaða bókum</p>);
    }*/

    const gogn = this.state.data.items.map((bok) => {

      let published = bok.published;
      if (bok.published) {
        published = ', gefin út ' + bok.published;
      }

      return (
        <div key={bok.id}>
          <Link to={'/books/' + bok.id}><h3>{bok.title}</h3></Link>
          <p>Eftir {bok.author} {published}</p>
        </div>
        )
    })
    return (
      <div>
        <h3>Bækur</h3>
        {gogn}
        <Link to='/'>
          <Button children='Fyrri síða'/>
        </Link>
        <p>Síða 1</p>
        <Link to='/'>
          <Button children='Næsta síða'/>
        </Link>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Books;
