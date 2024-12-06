import React from 'react'
import Blogs from '../../components/Blogs/Blog'
import Blog_video from '../../components/Blogs/Blog_video'
import Footer from '../../components/HomePage/Footer/Footer'
import NavBar from '../../components/HomePage/NavBar/NavBar'
import JobsIntro from '../../components/Blogs/JobsIntro'

const Blog = () => {
  return (
    <div>
      <NavBar/>
      <Blogs/>
      <JobsIntro/>
      <Blog_video/>
      <Footer/>
    </div>
  )
}

export default Blog
