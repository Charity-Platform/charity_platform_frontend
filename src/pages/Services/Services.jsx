import React from 'react';
import NavBar from '../../components/HomePage/NavBar/NavBar';
import Back from '../../components/Back/Back';
import Card_services from '../../components/Service_instruct/Card-services';
import Paralex from '../../components/Paralex/Paralex';
import Footer from '../../components/HomePage/Footer/Footer';
import img from '../../assets/service.jpg'

const Services = () => {
  return (
    <>
      <NavBar />
      <Back title={'الخدمات '} backgroundImage={img}/> 
      <Card_services/>
      <Paralex/>
      <Footer/>
    </>
  );
}

export default Services;
