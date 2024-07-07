import React from 'react'
import NavBar from '../HomePage/NavBar/NavBar'
import Back from '../Back/Back'
import MainInstructor from './MainInstructor';
import Footer from '../../component/HomePage/Footer/Footer'
import './MainInstructor.css';
const Instructors = () => {
  
  return (
    <div>
    <NavBar/>
    <Back title={'المستشارين'}/>
    <div className='mb-5 card-instructor'>
    <MainInstructor/>
    <MainInstructor/>

    </div>
 
   
<Footer/>

    </div>
  )
}

export default Instructors
