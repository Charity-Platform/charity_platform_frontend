import React from 'react'
import NavBar from '../../components/HomePage/NavBar/NavBar'
import ContactForm from '../../components/Contact/ContactForm'
import Footer from '../../components/HomePage/Footer/Footer'
import Back from '../../components/Back/Back'

const Contact = () => {
  return (
    <div>
      <NavBar/>
      <Back title="تواصل معنا "/>
      <ContactForm/>
      <Footer/>
    </div>
  )
}

export default Contact
