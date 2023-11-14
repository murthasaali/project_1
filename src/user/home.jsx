import React from 'react'
import Navber from './navbar'
import Mainbar from './mainbar'
import { motion } from 'framer-motion';
import Carousel from './carousal';
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
function Home() {


  return (
    <div className=' justify-center flex flex-col items-center bg-cover bg-left-bottom	 w-full h-screen bg-stone-200  bg-no-repeat	 '>
  
  
    
   <div className='w-full h-full  flex flex-col '>
    <Mainbar/>
    <div className='w-full flex p-3 h-1/2'>
      <div className='w-3/4 bg-black rounded-lg bg-opacity-30'><Carousel/></div>
      <div className='w-1/2 p-7 font-thin'> <p>most popular brands</p><motion.ul
    className="w-full h-full p-4 gap-4 grid grid-cols-4  grid-rows-2 gap-15 p-15 overflow-hidden bg-opacity-20 rounded-3xl"
    variants={container}
    initial="hidden"
    animate="visible"
  >
    {[0, 1, 2, 3,5,6,7,8].map((index) => (
      <motion.li key={index} className="rounded-full h-24 w-24 bg-black bg-opacity-20" variants={item} />
    ))}
  </motion.ul></div>
    </div>
   </div>
   <Navber/>
    </div>
  )
}

export default Home