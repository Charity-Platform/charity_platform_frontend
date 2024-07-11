import Footer from '../../components/HomePage/Footer/Footer';
import NavBar from '../../components/HomePage/NavBar/NavBar';
import CourcesComponent from '../../components/Cources/Cources';
import TitleCourse from '../../components/Cources/TitleCourse';
import CardCources from '../../components/Cources/CardCources';

const Cources = () => {
  return (
    <div>
      <NavBar/>
      <CourcesComponent/>
      <TitleCourse/>
      <CardCources/>
      <Footer/>
    </div>
  )
}

export default Cources
