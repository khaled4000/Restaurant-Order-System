import React, { useState } from 'react'
import Header from '../../components/Header/Header'

import AppDownload from '../../components/AppDownload/AppDownload'
import Hero from '../../components/hero/Hero'
import Hero1 from '../../components/hero1/Hero1'
const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>

      <br/>
      <br/> <br/>
      
    <Hero1/>
   
    <br/> <br/> <br/>
    <hr />
<Hero/>
<br/> <br/> <br/> <br/>
<hr />
      <AppDownload/>
    </>
  )
}

export default Home
