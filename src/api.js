
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
  const response = await fetch(url);
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

export {
  get,
  registerPost,
};
