
const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {

  const token = window.localStorage.getItem('token');
  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  /* todo framkvæma get */
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

/* todo aðrar aðgerðir */
async function registerPost(username, password, name) {
  const endpoint = '/register';
  const url = `${baseurl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
    })
  })
  const data = await response.json();
  return data;
}

async function loginPost(username, password) {
  const endpoint = '/login';
  const url = `${baseurl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
  const data = await response.json();
  return data;
}

async function readPost(umsogn, einkunn, id) {
  const endpoint = '/users/me/read';
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');

  const options = {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      bookId: Number(id),
      rating: Number(einkunn),
      review: umsogn,
    })
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
  }
  console.log(options);
  const response = await fetch(url, options);

  const data = await response.json();
  console.log(data);
  return data;
}

export {
  get,
  registerPost,
  loginPost,
  readPost,
};
