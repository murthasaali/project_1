import React, { useState } from 'react'
import  axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectIscart, selectUserToken, selectUserid } from '../redux/authSlice'
import { setIscart } from '../redux/authSlice'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
function Cart() {
    const isCart=useSelector(selectIscart)
    const userToken=useSelector(selectUserToken)
    const [cartitem,setCaritem]=useState([])
    const userId=useSelector(selectUserid)
    const dispatch=useDispatch()
    const viewCart = async (userId, token) => {
      try {
        const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { status, message, data } = response.data;
        if (status === 'success') {
          // Successfully fetched cart items.
          const products=data.products
          setCaritem(products)
          console.log(products)
        
         
        } else {
          console.error('Cart item retrieval failed. Message:', message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    useEffect(() => {
      viewCart(userId, userToken);
    }, [ userId,userToken]);
  
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
      className=" w-full h-full  bg-no-repeat bg-conatin bg-center bg-black  rounded-lg bg-[url('car.png')]"
      onClick={(e) => e.stopPropagation()}
  
      
      > <div className='w-4/6 h-full bg-white bg-opacity-90 rounded-lg'>
          {
          cartitem.map((value)=>{
        return (value.cart.map((item)=>{
         return (<ul key={item._id}>
            <li>
          {item.title}
          {/* {item._id} */}

            </li>


          </ul>)



         })


         )
          })
        }  
      </div>


      
    </motion.div>
 
  </motion.div>
   }
      </>
  )
}

export default Cart