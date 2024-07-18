import React from 'react'
import Blogs from '../../components/Blogs/Blog'
import Blog_nav from '../../components/Blogs/Blog_nav'
import Blog_video from '../../components/Blogs/Blog_video'
import Footer from '../../components/HomePage/Footer/Footer'
const Blog = () => {
  return (
    <div>
      <Blog_nav/>
      <Blogs/>
      <Blog_video/>
      <Footer/>
    </div>
  )
}

export default Blog
