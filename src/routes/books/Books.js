import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { get } from '../../api';

import Button from '../../components/button';

import './Books.css';

class Books extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
      offset: 0,
      search: '',
      counter: 0,
    };

    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  setQueryValues() {
    const query = this.props.location.search;
    const querysplit = query.split('&');
    if (querysplit.length === 2) { // Search og offset
      const fyrri = querysplit[0].split('=');
      const seinni = querysplit[1].split('=');
      if (fyrri[0] === '?search') {
        this.setState({search: fyrri[1]});
        this.setState({offset: seinni[1]});
      } else {
        this.setState({search: seinni[1]});
        this.setState({offset: fyrri[1]});
      }
    } else {
      const searchEdaOffset = querysplit[0].split('=');
      if (searchEdaOffset[0] === '?search') {
        this.setState({search: searchEdaOffset[1]});
      } else if (searchEdaOffset[0] === '?offset') {
        this.setState({offset: searchEdaOffset[1]});
      }
    }
  }

  async componentDidMount() {
    this.setQueryValues();
    try {
      const data = await get('/books' + this.props.location.search);
      this.setState({ data, loading: false, counter: data.items.length });
    } catch (error) {
      console.error('Error fetching books', error);
      this.setState({ error: true, loading: false });
    }

  }

  handleBack(e) {
    const offset = Number(this.state.offset) - 10;
    if (this.state.search !== '') {
      window.location.assign('/books?search=' + this.state.search + '&offset=' + offset);
    } else {
      window.location.assign('/books?offset=' + offset);
    }
  }

  handleNext(e) {
    const offset = Number(this.state.offset) + 10;
    if (this.state.search !== '') {
      window.location.assign('/books?search=' + this.state.search + '&offset=' + offset);
    } else {
      window.location.assign('/books?offset=' + offset);
    }
  }

  render() {
    const { data, error, loading, offset, search, counter } = this.state;

    let fyrriTakki = '';
    if (Number(offset) !== 0) {
      fyrriTakki = <Button onClick={this.handleBack} children='Fyrri síða'/>;
    }
    //console.log(this.state.data.items[0]);
    //if (this.state.data.items.lenght < 10)

    let heading = <h1 className='bokaFyrirsogn'>Bækur</h1>;
    if (search !== ''){
      heading = <h1 className='bokaFyrirsogn'>Bókaleit: {search}</h1>;
    }
    if (loading) {
      return (<p>Hleð bókum...</p>);
    }

    if (error) {
      return (<p>Villa við að hlaða bókum</p>);
    }

    const gogn = data.items.map((bok) => {
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

    let seinniTakki = <Button onClick={this.handleNext} children='Næsta síða'/>;
    if (counter < 10) {
      seinniTakki = '';
    }

    return (
      <div className='meginmal'>
        <Helmet title="Bækur" />
        {heading}
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

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Books;
