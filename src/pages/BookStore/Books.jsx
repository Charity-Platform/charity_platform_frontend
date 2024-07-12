import NavBar from '../../components/HomePage/NavBar/NavBar'
import Hero from '../../components/BookStore/Hero';
import BookApp from '../../components/BookStore/Books';
import Footer from '../../components/HomePage/Footer/Footer'

const Books = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <BookApp/>
      <Footer/>
    </div>
  )
}

export default Books
