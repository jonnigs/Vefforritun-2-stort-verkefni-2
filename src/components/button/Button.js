import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class Button extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    to: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    onClick: () => {},
  }

  render() {
    const { children, className, onClick, to } = this.props;

    const classes = `button ${className}`

    return (
      <button onClick={onClick} className={classes}>{children}</button>
    );
  }

}
