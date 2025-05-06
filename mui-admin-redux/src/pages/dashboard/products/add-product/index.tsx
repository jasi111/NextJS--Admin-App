import AddProduct from '@/components/AddProduct'
import DashboardLayout from '@/components/DashboardLayout'
import React from 'react'

function hello() {
  return (
    <div>
      Products
      <DashboardLayout>
        <AddProduct />
      </DashboardLayout>
    </div>
  )
}

export default hello