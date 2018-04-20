import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Books from './routes/books';
import Book from './routes/book';
import Login from './routes/login';
import Register from './routes/register';
import Users from './routes/users';
import UserID from './routes/userid';
import Profile from './routes/profile';
import Edit from './routes/edit';
import Newbook from './routes/newbook';
import NotFound from './routes/not-found';
/* todo fleiri routes */

import './App.css';

class App extends Component {

  render() {
    const authenticated = false; /* vita hvort notandi sé innskráður */

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/books" exact component={Books} />
            <Route path="/books/new" exact component={Newbook} />
            <Route path="/books/:id" exact component={Book} />
            <Route path="/books/:id/edit" exact component={Edit} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/:id" exact component={UserID} />
            <Route path="/profile" exact component={Profile} />
            {/* todo fleiri route */}
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  /* todo stilla redux ef það er notað */
}

export default withRouter(connect(mapStateToProps)(App));
