import React, { useState } from 'react'
import axios from 'axios'
import './styles/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async e => {
    e.preventDefault()
    // Validate username and password
    if (username.length < 4 || username.length > 20) {
      setErrorMessage('Username must be between 4 and 20 characters long.')
      return
    }
    if (password.length < 8 || password.length > 20) {
      setErrorMessage('Password must be between 8 and 20 characters long.')
      return
    }

    try {
      const response = await axios.post('/api/register', {
        email,
        password,
        username,
        firstName,
        lastName
      })
      console.log(response.data.message)
      // Navigate to the login page after successful registration
      navigate('/login', { state: { username, password } })
    } catch (error) {
      if (error.response.data.error === 'Email already exists') {
        setErrorMessage('Email already exists. Please use a different email.')
      } else if (error.response.data.error === 'Username already exists') {
        setErrorMessage(
          'Username already exists. Please choose a different username.'
        )
      } else {
        setErrorMessage(
          'An error occurred during registration. Please try again.'
        )
      }
    }
  }

  const handleCloseErrorMessage = () => {
    setErrorMessage('')
  }

  return (
    <div>
      <div className='background-container'></div>
      <div className='body-page'>
        <div className='body-container'>
          <div className='illustration-container'>
            <img src='/login.jpeg' alt='Registration Illustration' />
          </div>
          <div className='body-content'>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div className='form-row'>
                <div className='form-group'>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='First Name'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className='single-line-input'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    className='single-line-input'
                  />
                </div>
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className='single-line-input'
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className='single-line-input'
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  id='username'
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className='single-line-input'
                />
              </div>
              <div className='form-group'>
                <button type='submit' className='body-button'>
                  Register
                </button>
                <Link to='/Login'>Sign In</Link>
              </div>
            </form>
            <ErrorMessage message={errorMessage} />
            <div className='button-container'>
            <div class='tooltip-container'>
          <div class='tooltip'>
            <div class='profile'>
              <div class='user'>
                <div class='img'>Ui</div>
                <div class='details'>
                  <div class='name'>User</div>
                  <div class='username'>@username</div>
                </div>
              </div>
              <div class='about'>500+ Connections</div>
            </div>
          </div>
          <div class='text'>
            <a
              class='icon'
              href='https://instagram.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='layer'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class='fab fa-instagram'>
                  <svg viewBox='0 0 448 512' height='1em'>
                    <path
                      fill='#e1306c'
                      d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'
                    ></path>
                  </svg>
                </span>
              </div>
              <div class='text'>Instagram</div>
            </a>
          </div>
        </div>

              <div class='tooltip-container'>
                <div class='tooltip'>
                  <div class='profile'>
                    <div class='user'>
                      <div class='img'>Ui</div>
                      <div class='details'>
                        <div class='name'>User</div>
                        <div class='username'>@username</div>
                      </div>
                    </div>
                    <div class='about'>500+ Connections</div>
                  </div>
                </div>
                <div class='text'>
                  <a
                    class='icon'
                    href='https://freecodez.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div class='layer'>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span class='fab fa-linkedin'>
                        <svg viewBox='0 0 448 512' height='1em'>
                          <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'></path>
                        </svg>
                      </span>
                    </div>
                    <div class='text'>LinkedIn</div>
                  </a>
                </div>
              </div>

              <div class='tooltip-container'>
          <div class='tooltip'>
            <div class='profile'>
              <div class='user'>
                <div class='img'>Ui</div>
                <div class='details'>
                  <div class='name'>User</div>
                  <div class='username'>@username</div>
                </div>
              </div>
              <div class='about'>500+ Connections</div>
            </div>
          </div>
          <div class='text'>
            <a
              class='icon'
              href='https://facebook.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div class='layer'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class='fab fa-facebook'>
                  <svg viewBox='0 0 320 512' height='1em'>
                    <path
                      fill='#4267b2'
                      d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'
                    ></path>
                  </svg>
                </span>
              </div>
              <div class='text'>Facebook</div>
            </a>
          </div>
        </div>

        <div className='tooltip-container'>
          <div className='tooltip profile'>
            <div className='user'>
              <div className='img'>JD</div>
              <div className='details'>
                <div className='name'>John Doe</div>
                <div className='about'>Software Engineer</div>
              </div>
            </div>
          </div>
          <a href='https://reddit.com/' className='icon' target='_blank' rel='noopener noreferrer'>
            <div className='layer'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className='fab fa-reddit'>
                <svg viewBox='0 0 512 512' height='1em'>
                  <path
                    fill='#ff4500'
                    d='M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 9.9-1.7 14.9 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-4.9-.6-9.8-1.6-14.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z'
                  ></path>
                </svg>
              </span>
            </div>
            <div className='text'>Reddit</div>
          </a>
        </div>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
