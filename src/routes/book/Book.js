import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, post } from '../../api';

import Button from '../../components/button';

class Book extends Component {

  state = {
    data: null,
    loading: true,
  }

  async componentDidMount() {
  try {
    const data = await get('/books/'+this.props.match.params.id);
    this.setState({ data, loading: false });
  } catch (error) {
    console.error('Error fetching books', error);
    this.setState({ error: true, loading: false });
  }
}

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return (<p>Sæki bók...</p>);
    }

    /*if (error) {
      return (<p>Villa við að hlaða bókum</p>);
    }*/

    let description = data.description;
    if (data.description) {
      description = <p>{data.description}</p>;
    }
    let pagecount = data.pagecount;
    if (data.pagecount) {
      pagecount = <p>{data.pagecount} síður</p>;
    }
    let published = data.published;
    if (data.published) {
      published = <p>Gefin út {data.published}</p>;
    }
    let language = data.language;
    if (data.language) {
      language = <p>Tungumál: {data.language}</p>;
    }

    return (
      <div>
        <h3>{data.title}</h3>
        <p>Eftir {data.author}</p>
        <p>ISBN13-{data.isbn13}</p>
        <p>{data.categorytitle}</p>
        {description}
        {pagecount}
        {published}
        {language}
        <p>Breyta bók</p>
        <Link to='/books'>
          <Button children ='Til baka'/>
        </Link>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Book;
