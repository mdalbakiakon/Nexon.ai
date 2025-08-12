import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Plan from '../components/Plan'
import Footer from '../components/footer'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />
    </>
  )
}

export default Home
