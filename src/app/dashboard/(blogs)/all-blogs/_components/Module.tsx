import React from 'react'
import { getAllBlogs } from '../_actions'
import BlogTable from './BlogTable';


const AllBlogsModule = async () => {
  const blogs = await getAllBlogs();
  return (
    <div>
      <BlogTable data={blogs?.data} />
    </div>
  )
}

export default AllBlogsModule
