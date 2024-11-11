import React from 'react'
import NavBar from '../../components/HomePage/NavBar/NavBar'
import Slider from '../../components/HomePage/Slider/Slider'
import About from '../../components/HomePage/About/About'
import Instructor from '../../components/HomePage/Instructors/Instructor'
import Questions from '../../components/HomePage/Qustions/Questions'
import Footer from '../../components/HomePage/Footer/Footer'
import Services from '../../components/HomePage/services/Services'

const Home = () => {
  return (
    <>
      <NavBar/>
      <Slider/>
      <About/>
      <Instructor/>
      <Services/>
      <Questions/>
      <Footer/>
    </>
  )
}

export default Home
