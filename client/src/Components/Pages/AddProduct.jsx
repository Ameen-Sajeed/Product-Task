import React from 'react'
import AddProd from '../Admin/AddProd'
import Sidebar from '../Admin/Sidebar/Sidebar'

function AddProducts() {
  return (
    <div className='flex'>
        <Sidebar/>
        <AddProd/>

    </div>
  )
}

export default AddProducts