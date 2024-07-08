import React from 'react'
import NavBar from '../../components/HomePage/NavBar/NavBar'
import Back from '../../components/Back/Back'
import MainInstructor from '../../components/instructors/MainInstructor';
import Footer from '../../components/HomePage/Footer/Footer'
import '../../components/instructors/MainInstructor.css';
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
