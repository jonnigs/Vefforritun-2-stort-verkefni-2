
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
  const response = await fetch(url, options);

  const data = await response.json();
  return data;
}

async function profilePatch(name, password, id) {
  const endpoint = '/users/me';
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');

  const options = {
    method: 'PATCH',
    headers: {},
    user: {
      id: id,
    },
    body: {}
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
  }

  if (name) {
    options.body['name'] = name;
  }

  if (password) {
    options.body['password'] = password;
  }

  options.body = JSON.stringify(options.body);
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function editBookPatch(data, id, title, author, description, category, isbn10, isbn13, published, pageCount, language ) {

  const endpoint = '/books/' + id;
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');

  const options = {
    method: 'PATCH',
    headers: {},
    params: id,
    body: {}
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
  }

  if(data.title !== title){
    options.body['title'] = title;
  }
  if(data.author !== author){
    options.body['author'] = author;
  }
  if(data.description !== description){
    options.body['description'] = description;
  }
  if(data.category !== category){
    options.body['category'] = category;
  }
  if(data.isbn10 !== isbn10){
    options.body['isbn10'] = isbn10;
  }
  if(data.isbn13 !== isbn13){
    options.body['isbn13'] = isbn13;
  }
  if(data.published !== published){
    options.body['published'] = published;
  }
  if(data.pageCount !== pageCount){
    options.body['pageCount'] = pageCount;
  }
  if(data.language !== language){
    options.body['language'] = language;
  }

  const tempBody = JSON.stringify(options.body);
  options.body = tempBody;

  const response = await fetch(url, options);
  const res = await response.json();
  return res;
}

async function newBookPost(title, author, description, category, isbn10, isbn13, published, pageCount, language ) {

  const endpoint = '/books';
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');

  const options = {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      title,
      author,
      description,
      category,
      isbn10,
      isbn13,
      published,
      pageCount,
      language,
    })
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
  }
  console.log(options);

  const response = await fetch(url, options);
  const res = await response.json();
  return res;
}

async function profileMyndPost(file, path, id) {
  const endpoint = '/users/me/profile';
  const url = `${baseurl}${endpoint}`;

  const formData = new FormData();

  formData.append("profile", file);

  const token = window.localStorage.getItem('token');

  const options = {
    method: 'POST',
    headers: {},
    body: formData,
    user: id,
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function lesturDelete(readid, userid) {
  const endpoint = '/users/me/read/' + readid;
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');

  const options = {
    method: 'DELETE',
    headers: {},
    params: JSON.stringify({
      id: readid,
    }),
    user: JSON.stringify({
      id: userid,
    }),
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  console.log(options);
  const response = await fetch(url, options);
  return response;
  /*console.log(response);
  const data = await response.json();
  return data;*/
}

export {
  get,
  registerPost,
  loginPost,
  readPost,
  profilePatch,
  profileMyndPost,
  editBookPatch,
  newBookPost,
  lesturDelete,
};
