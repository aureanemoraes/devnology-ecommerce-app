import React, { Suspense } from 'react'
import { Footer, Navbar, Product } from "../components"

const Products = () => {
  return (
    <Suspense fallback="...is loading">
      <Navbar />
      <Product />
      <Footer />
    </Suspense>
  )
}

export default Products