import React from 'react'
import NavBar from '../../components/HomePage/NavBar/NavBar'
import Back from '../../components/Back/Back'
import Aboutbody from '../../components/HomePage/About/About';
import Footer from '../../components/HomePage/Footer/Footer';
import '../../components/AboutPage/About.css';
import  TabsCustomAnimation  from '../../components/AboutPage/Tabs';
const About = () => {
  return (
    <>
      <NavBar/>
    <Back title={" من نحن"}/>
    <div className="about-body-container">
        <Aboutbody />
      </div>
    <TabsCustomAnimation/>
    <Footer/>
   
 
    </>
  )
}

export default About
