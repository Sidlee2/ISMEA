// Home.js
import React from 'react'
import Navbar from './Navbar'
import Body from './Body'
import './Home.css'
import Features from './Features'

const Home = () => {
  return (
    <div className='homepage'>
      <Navbar />
      <Body />
      <Features/>
    </div>
  )
}

export default Home