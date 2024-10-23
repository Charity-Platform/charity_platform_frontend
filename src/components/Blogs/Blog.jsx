import React from 'react';
import './Blog.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="blog">
      <div className="Blog-content">
        <h1 className="blog-title">
        شاركنا خبراتك واهتماماتك وكن جزء من مجتمع واعي الخيري
           {" "}
        </h1>

        <div className="blog-tag">
            <Link to='/comunity'>
            <Button className='button-hero'> إنطلق الآن <i className='p-2'>{}</i></Button>
            </Link>
       

        </div>
      </div>
      <div className="blog-books"></div>
    </div>
  );
}

export default Blog
