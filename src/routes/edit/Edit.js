import React, { Component } from 'react';
import { get, editBookPatch } from '../../api';

import Button from '../../components/button';

import './Edit.css';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      message: '',
      error: null,
      title: '',
      author: '',
      description: '',
      category: '',
      categories: '',
      isbn10: '',
      isbn13: '',
      published: '',
      pageCount: '',
      language: '',
    }

    // Breytingar á hverju input í formi
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleISBN10Change = this.handleISBN10Change.bind(this);
    this.handleISBN13Change = this.handleISBN13Change.bind(this);
    this.handlePublishedChange = this.handlePublishedChange.bind(this);
    this.handlePageCountChange = this.handlePageCountChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);

    // Takkar
    this.handleVista = this.handleVista.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }


  async componentDidMount() {
    try {
      const data = await get('/books/'+ this.props.match.params.id);
      const flokkar = await get('/categories');
      this.setFlokkar(flokkar);
      this.setState({ data: data, loading: false, title: data.title, author: data.author, description: data.description, category: data.category, isbn10: data.isbn10, isbn13: data.isbn13, published: data.published, pageCount: data.pagecount, language: data.language });
    } catch (error) {
      console.error('Error fetching books', error);
      this.setState({ error: true, loading: false });
    }
  }

  setFlokkar(flokkar) {
    const cat = flokkar.items.map((flokkur) => {
      return (
        <option value={flokkur.id}>{flokkur.title}</option>
      )
    });
    this.setState({categories: cat});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }
  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }
  handleCategoryChange(e) {
    this.setState({category: e.target.value});
  }
  handleISBN10Change(e) {
    this.setState({isbn10: e.target.value});
  }
  handleISBN13Change(e) {
    this.setState({isbn13: e.target.value});
  }
  handlePublishedChange(e) {
    this.setState({published: e.target.value});
  }
  handlePageCountChange(e) {
    this.setState({pageCount: e.target.value});
  }
  handleLanguageChange(e) {
    this.setState({language: e.target.value});
  }

  async handleVista(e) {
    e.preventDefault();
    const res = await editBookPatch(this.state.data, this.props.match.params.id, this.state.title, this.state.author, this.state.description, this.state.category, this.state.isbn10, this.state.isbn13, this.state.published, this.state.pages, this.state.language);
    console.log(res);
    if (res.error) {
      this.setState({message: <p className='villur'>Ekki tókst að breyta bók, bók verður að hafa titli og gilt 13 stafa ISBN13 númer</p>});
    } else {
      this.setState({message: <p className='success'>Bók hefur verið breytt</p>});
    }
  }

  handleBack(e) {
    this.props.history.goBack();
  }


  render() {
    const { loading, message, error, title, author, description, category, categories, isbn10, isbn13, published, pageCount, language } = this.state;

    if (!localStorage.getItem('user')){
      return (<p>Þú þarft að vera innskráður notandi til að hafa aðgang að þessum hluta vefsins</p>);
    }

    if (loading) {
      return (<p>Sæki bók...</p>);
    }

    if (error) {
      return (<p>Villa við að hlaða bók</p>);
    }



    return (
      <div className='editFormBox'>
        <h1>Breyta bók</h1>
        <form className='editForm'>
          <label>Titill:
            <input type='text' value={title} onChange={this.handleTitleChange}/>
          </label>
          <label>Höfundur:
            <input type='text' value={author} onChange={this.handleAuthorChange}/>
          </label>
          <label className='lysingLabel'>Lýsing:
            <textarea className='lysing' value={description} onChange={this.handleDescriptionChange}>
            </textarea>
          </label>
          <label>Flokkur:
            <select name="einkunn" value={category} onChange={this.handleCategoryChange}>
              {categories}
            </select>
          </label>
          <label>ISBN10:
            <input type='text' value={isbn10} onChange={this.handleISBN10Change}/>
          </label>
          <label>ISBN13:
            <input type='text' value={isbn13} onChange={this.handleISBN13Change}/>
          </label>
          <label>Útgefin:
            <input type='text' value={published} onChange={this.handlePublishedChange}/>
          </label>
          <label>Fjöldi síða:
            <input type='text' value={pageCount} onChange={this.handlePageCountChange}/>
          </label>
          <label>Tungumál:
            <input type='text' value={language} onChange={this.handleLanguageChange}/>
          </label>
          {message}
          <Button onClick={this.handleVista} children='Vista'/>
        </form>
        <Button onClick={this.handleBack} children='Til baka'/>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Edit;
