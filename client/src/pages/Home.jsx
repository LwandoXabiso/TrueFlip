import React from 'react'
import Hero from '../components/Hero'
import LastestListings from '../components/LastestListings'
import Plans from '../components/Plans'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LastestListings/>
      <Plans/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default Home
