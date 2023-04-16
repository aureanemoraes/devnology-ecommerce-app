import { Navbar, Main, Product, Footer } from "../components";
import { Suspense } from 'react';

function Home() {

  return (
    <Suspense fallback="...is loading">
      <Navbar/>
      <Main />
      <Product />
      <Footer />
    </Suspense >
  )
}

export default Home