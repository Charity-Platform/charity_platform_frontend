import React from 'react'
import NavBar from '../HomePage/NavBar/NavBar'
import Slider from '../HomePage/Slider/Slider'
import About from '../HomePage/About/About'
import Instructor from '../HomePage/Instructors/Instructor'
import Questions from '../HomePage/Qustions/Questions'
import Footer from '../HomePage/Footer/Footer'

const Home = () => {
  return (
    <>
      <NavBar/>
      <Slider/>
      <About/>
      <Instructor/>
      <Questions/>
      <Footer/>
    </>
  )
}

export default Home
