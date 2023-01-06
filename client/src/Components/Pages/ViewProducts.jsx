import React from 'react'
import Product from '../Admin/Product'
import Sidebar from '../Admin/Sidebar/Sidebar'

function ViewProducts() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Product/>

    </div>
  )
}

export default ViewProducts