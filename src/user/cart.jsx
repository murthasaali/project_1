import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIscart } from '../redux/authSlice'
import { setIscart } from '../redux/authSlice'
import { motion } from 'framer-motion'
function Cart() {
    const isCart=useSelector(selectIscart)
    const dispatch=useDispatch()
  return (
    <>
  { isCart&& <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection:"column",
      alignItems:"center",
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.9)',
      zIndex: 999,
    }}
    onClick={() =>dispatch(setIscart(false))}
  >
    <p className='headings'> CART DETAILS</p>
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween', stiffness: 260, damping: 20 }}
      // style={{
      //   background: 'white',
      //   padding: '2rem',
      //   borderRadius: '0.5rem',
      // }}
      className=" w-4/5 h-3/4  bg-no-repeat bg-conatin bg-center bg-black  rounded-lg bg-[url('car.png')]"
      onClick={(e) => e.stopPropagation()}
  
      
      > <div className='w-full h-full bg-black bg-opacity-90 rounded-lg'>


      </div>
    {/* <input type="text" className='bg-stone-300 text-blue-950  w-3/4 h-14 rounded-3xl pl-4 overflow-hidden shadow-md'/> */}

      
    </motion.div>
 
  </motion.div>
   }
      </>
  )
}

export default Cart