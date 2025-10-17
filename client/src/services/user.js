import axios from 'axios'

// const API_URL = 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export async function registerUser(
  firstName,
  lastName,
  email,
  password,
  phone
) {
  try { 
    // create url
    const url = `${API_URL}/user/register`
   console.log('Server URL:', API_URL);

    // create the body
    const body = {
      firstName,
      lastName,
      email,
      password,
      phone,
    }

    // make the API call : call backend api for registeration
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.error(ex);
    return { status: 'error', error: ex.message || 'Registration failed' };
  }
}

export async function loginUser(email, password) {
  try {
    // create url
    const url = `${API_URL}/user/login`

    // create the body
    const body = {
      email,
      password,
    }
    
    console.log(" Email " + email + " Password "+ password);
    // make the API call
    const response = await axios.post(url, body)

    console.log("Getting response from backend " + response.data);
    // return response body
    return response.data;
  } catch (err) {
    console.error('exception: ', err.err)
    return { status: 'error', error: err.message || 'Login failed' };
  }
}
