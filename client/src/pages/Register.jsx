import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../services/user'

function Register() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
  })

  // get the navigate function reference
  const navigate = useNavigate()

  const onRegister = async () => {
    if (info.firstName.length == 0) {
      toast.warn('Please enter first name')
    } else if (info.lastName.length == 0) {
      toast.warn('Please enter last name')
    } else if (info.email.length == 0) {
      toast.warn('Please enter email')
    } else if (info.password.length == 0) {
      toast.warn('Please enter password')
    } else if (info.confirmPassword.length == 0) {
      toast.warn('Please enter password')
    } else if (info.confirmPassword !== info.password) {
      toast.warn('Password does not match')
    } else {
      const { firstName, lastName, email, password, phone } = info
      const result = await registerUser(
        firstName,
        lastName,
        email,
        password,
        phone
      )
      if (result['status'] == 'success') {
        toast.success('Successfully registered a user')

        // navigate to the login screen
        navigate('/login')
      }
    }
  }

  return (
    <div>
      <h1 className='page-header'>Register</h1>
      <div className='container'>
        <div className='mb-3'>
          <label htmlFor=''>First Name</label>
          <input
            onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Last Name</label>
          <input
            onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Phone Number</label>
          <input
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            type='tel'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
            type='password'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Confirm Password</label>
          <input
            onChange={(e) =>
              setInfo({ ...info, confirmPassword: e.target.value })
            }
            type='password'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <div className='mb-3'>
            Already have an account yet? Login <Link to='/'>here</Link>
          </div>
          <button
            onClick={onRegister}
            className='btn btn-success'
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
