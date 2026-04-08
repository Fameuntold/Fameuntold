import React from 'react'
import Hero from '../component/Hero'
import Welcome from '../component/Welcome'
import OwnerSpeech from '../component/OwnerSpeech'
import OurJourney from '../component/OurJourney'
import DonatePage from '../component/DonatePage'
import Contact from '../component/Contact'
import PastEvent from '../component/PastEvent'
import Achievement from '../component/Achievement'
import VolunteersSection from '../component/VolunteersSection'


const Home = () => {
  return (
    <div>
        <Hero/>
     
        <Welcome/>
        <OwnerSpeech/>
        <OurJourney/>
       
        <PastEvent/>
         
         <DonatePage/>
     
        <Achievement/>
         <Contact/>
        <VolunteersSection/>
       
        
        
        
        
    </div>
  )
}

export default Home