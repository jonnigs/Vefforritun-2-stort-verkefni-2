import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, readPost } from '../../api';

import Button from '../../components/button';

import './Book.css';

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
      lestur: false,
      umsogn: '',
      einkunn: 1,
      message: '',
      id: this.props.match.params.id,
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
      const data = await get('/books/'+ this.props.match.params.id);
      if (data.error) {
        window.location('/error');
      }
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
    if (res.error) {
      this.setState({message: <p className='villur'>Ekki tókst að skrá lestur, athugaðu hvort allt hafi verið sett rétt inn</p>})
    } else {
      this.setState({message: <p className='success'>Lestur á bók hefur verið skráður</p>, lestur: false});
    }
  }

  handleHaetta(e) {
    this.setState({lestur: false});
  }

  render() {
    const { data, loading, error, lestur, umsogn, einkunn, message, id } = this.state;

    if (loading) {
      return (<p>Sæki bók...</p>);
    }

    if (error) {
      return (<p>Villa við að hlaða bók</p>);
    }

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
    if (message) {
      skilabod = message;
    }

    let lesa = '';
    let breytaBok = '';
    if (localStorage.getItem('user')) {
      if (lestur) {
         lesa = <form>
                  <label> Um bók:
                    <textarea className='umBok' value={umsogn} onChange={this.handleUmsognChange}>
                    </textarea>
                  </label>
                  <label> Einkunn:
                    <select className='einkunn' name="einkunn" value={einkunn} onChange={this.handleEinkunnChange}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </label>
                  <div className='bookidFormTakkaDiv'>
                    <Button onClick={this.handleVista} children='Vista'/>
                    <Button className='carefull' onClick={this.handleHaetta} children='Hætta við' />
                  </div>
                </form>;
      } else {
        lesa = <Button className='bookidTakki' onClick={this.handleRead} children='Lesin bók'/>
      }
      breytaBok = <Link to={'/books/' + id + '/edit'}><Button className='bookidTakki' children='Breyta bók'/></Link>;
    }

    return (
      <div className='meginmal'>
        <h2>{data.title}</h2>
        <p>Eftir {data.author}</p>
        <p>ISBN13-{data.isbn13}</p>
        <p>{data.categorytitle}</p>
        {description}
        {pagecount}
        {published}
        {language}
        {skilabod}
        <div className='takkar'>
          {breytaBok}
          {lesa}
          <Button className='bookidTakki' onClick={this.handleBack} children='Til baka'/>
        </div>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Book;
