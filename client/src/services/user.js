import axios from 'axios'
import { config } from './config'

export async function registerUser(
  firstName,
  lastName,
  email,
  password,
  phone
) {
  try { 
    // create url
    const url = `${config.serverUrl}/user/register`
   console.log('Server URL:', config.serverUrl);

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
    const url = `${config.serverUrl}/user/login`

    // create the body
    const body = {
      email,
      password,
    }

    // make the API call
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (err) {
    console.error('exception: ', err.err)
    return { status: 'error', error: err.message || 'Login failed' };
  }
}
