import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import Plus from "../assets/plus.png"


export default function Blog(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain } = globalContext

  const cookies = new Cookies();
  const [showing, setShowing] = useState(3)
  const [blogListings, setBlogListings] = useState([])

  var options = { year: 'numeric', month: 'long', day: 'numeric' };


  function getBlogs()  {
    fetch(`${domain}/blog-feed`, {
    method: 'GET',
    headers: {
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: 'same-origin',
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setBlogListings(data.blogs)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(()=> {
    getBlogs()
  }, [])


  return(
    <>
  {(blogListings && blogListings.length > 0) ?

      <div ref={(props.ref)? props.ref : null} className="section-outer vertical-center flex-col margin-top-5">
    <h2 className="primary-foreground text-center">Blog</h2>

    <div className={`${(windowDimensions.width >= 950)? "blog-outer" : "blog-outer-mobile"} vertical-center flex-col`}>
    { blogListings.map((blog, ind) => {
    if (ind >= showing) {
      return(<></>)
    }

    return (
      <div onClick={()=> window.open(blog.url, "_blank")} key={`blog ${ind}`} className={`${(windowDimensions.width >= 950)? "blog-inner" : "blog-inner-mobile"} pointer ${(ind > 0)? "padding-top-15": ""}`}>
        <div className={`${(windowDimensions.width >= 950)? "col1 horizontal-center blog-col" : "row1 vertical-center blog-col-mobile"} flex-col`}>
          <img className="blog-image" src={blog.image} />
        </div>
        <div className={`${(windowDimensions.width >= 950)? "col2" : "row2"} horizontal-center flex-col`}>
          <p className="p2 gray-foreground">{new Date(blog.date).toLocaleDateString("en-US", options)} -</p>
          <a href={blog.url} className="p2 secondary-foreground padding-top-url">{blog.url}</a>
          <h4 className="primary-foreground padding-top-title">{blog.title}</h4>
          <p className="primary-foreground padding-top-descript">{blog.descript}</p>
        </div>
      </div>

    )

  }) }
    </div>
    </div>
   : null}

  {(showing < blogListings.length)?
  <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={()=> setShowing(showing + 3)}><img className="plus-icon" src={Plus} />See More</h5>
  :
  (blogListings.length > 3)?
  <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={()=> setShowing(3)}>Hide</h5>
  :
  null
  }
  </>



  )

};
