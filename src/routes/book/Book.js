import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, readPost } from '../../api';

import Button from '../../components/button';

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      lestur: false,
      umsogn: '',
      einkunn: false,
      message: '',
    }

    this.handleBack = this.handleBack.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleVista = this.handleVista.bind(this);
    this.handleHaetta = this.handleHaetta.bind(this);
    this.handleUmsognChange = this.handleUmsognChange.bind(this);
    this.handleEinkunnChange = this.handleEinkunnChange.bind(this);
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

  handleBack(e) {
    this.props.history.goBack();
  }

  async handleRead(e) {
    this.setState({lestur: true});
  }

  handleUmsognChange(e) {
    this.setState({umsogn: e.target.value});
  }

  handleEinkunnChange(e) {
    this.setState({einkunn: e.target.value});
  }

  async handleVista(e) {
    e.preventDefault();
    const res = await readPost(this.state.umsogn, this.state.einkunn, this.props.match.params.id);
    this.setState({message: 'Lestur á bók var skráður', lestur: false});
  }

  handleHaetta(e) {
    this.setState({lestur: false});
  }

  render() {
    const { data, loading, lestur, umsogn, einkunn, message } = this.state;

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

    let skilabod = '';
    if (this.state.message) {
      skilabod = <p>{this.state.message}</p>
    }

    let lesa = '';
    if (this.state.lestur) {
       lesa = <form>
                <label> Um bók:
                  <textarea value={this.state.umsogn} onChange={this.handleUmsognChange}>
                  </textarea>
                </label>
                <label> Einkunn:
                  <select name="einkunn" value={this.state.einkunn} onChange={this.handleEinkunnChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
                <Button onClick={this.handleVista} children='Vista'/>
                <Button onClick={this.handleHaetta} children='Hætta við' />
              </form>;
    } else {
      lesa = <Button onClick={this.handleRead} children='Lesin bók'/>
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
        {skilabod}
        {lesa}
        <Button onClick={this.handleBack} children='Til baka'/>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Book;
