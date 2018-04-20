
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api'; // eslint-disable-line

export const LOGIN_REQUEST = 'LOGIN_REQUEST';

function requestLogin() { // eslint-disable-line
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */
