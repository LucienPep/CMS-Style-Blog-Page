// gets input data for sign in from handlebars views and send them in a POST request to  be processed 
const loginFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// gets input data for sign up from handlebars views and send them in a POST request to create a new user
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-sign').value.trim();
  const password = document.querySelector('#password-sign').value.trim();

  if (name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};


//listener for handlebars pages to submit login or sign up data
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
 .querySelector('.signup-form')
 .addEventListener('submit', signupFormHandler);
