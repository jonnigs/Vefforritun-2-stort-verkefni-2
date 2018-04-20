import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends Component {

  render() {
    let byrjunarSkilabod = <p>Til að njóta bókasafnsins til fullnustu mælum við með að <Link to='/login'>skrá sig inn.</Link> Þangað til getur þú skoðað <Link to='/books'>allar bækurnar.</Link></p>;
    let skilabodTvo = '';
    if (localStorage.getItem('user')) {
      byrjunarSkilabod = <p>Þú ert skráður notandi og getur því <Link to='/books/new'>skráð bækur</Link> og breytt <Link to='/books'>þeim sem til eru.</Link></p>;
      skilabodTvo = <p>Einnig getur þú <Link to='/users'>skoðað aðra notendur</Link></p>;
    }

    return (
      <div className='meginmal'>
        <h1 className='forsidufyrirsogn'>Velkomin á bókasafnið</h1>
        {byrjunarSkilabod}
        {skilabodTvo}
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
