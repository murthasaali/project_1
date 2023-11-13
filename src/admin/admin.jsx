import React from 'react'
import { motion } from 'framer-motion';
import { MdOutlineAutoGraph } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiHomeAlt ,BiCartAdd} from "react-icons/bi";
import { FaOpencart } from "react-icons/fa";
import { SiStackoverflow } from "react-icons/si";
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';
import GetAllproduct from './getAllproduct';
import Sales from './sales';
import GetAllUsers from './getAllusers';
  import Addproduct from './addproduct';
  const container = {
    hidden: { opacity: 0.8, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
function Admin() {
  const nav=useNavigate()
  const location=useLocation()
  const isuser=location.pathname.endsWith('/admin/user')
  const issales=location.pathname.endsWith('/admin/sales')
  const isdash=location.pathname.endsWith('/admin')
  const isprosec=location.pathname.endsWith('/admin/prosec')
  const isadd=location.pathname.endsWith('/admin/add')
  return (
    <div className='bg-gradient-to-r from-violet-800 to-fuchsia-800 h-screen w-full  flex p-8 px-10 gap-4' >
        <motion.container
         variants={container}
         initial="hidden"
         animate="visible"
         className='bg-white bg-opacity-20 w-1/4 h-full rounded-lg  justify-center gap-8 font-sans text-black  flex flex-col Iitems-start' >
           
            <motion.item  variants={item} className='flex ml-10  justify-start items-center gap-1 ' ><SiStackoverflow className='text-3xl text-white'/>  <h1>DASH BOARD</h1></motion.item>
            <motion.item  variants={item} className='flex ml-10  justify-start items-center gap-1 ' ><BiHomeAlt className='text-3xl text-white'/>  <h1> HOME</h1></motion.item>
            <motion.item  variants={item} className='flex ml-10  justify-start items-center gap-1 ' ><MdOutlineAutoGraph className='text-3xl  text-white'/>  <h1>SALES</h1></motion.item>
            <motion.item  variants={item} className='flex ml-10  justify-start items-center gap-1 ' ><BiUser className='text-3xl  text-white'/>  <h1 onClick={()=>nav('/admin/user')}>USE DETAIL</h1></motion.item>
            <motion.item  variants={item} className='flex ml-10  justify-start items-center gap-1 ' ><FaOpencart className='text-3xl  text-white'/>  <h1 onClick={()=>nav('/admin/prosec')}>PRODUCT DETAILS</h1></motion.item>
            <motion.item  variants={item} className='flex ml-10  justify-start items-center gap-1 ' ><BiCartAdd className='text-3xl  text-white'/> <h1 onClick={()=>nav('/admin/add')}>ADD PRODUCT</h1></motion.item>
           
        </motion.container >
        <motion.container 
        variants={container} 
        initial="hidden"
        animate="visible"
        className='bg-hampton w-3/4  bg-opacity-20  h-full rounded-lg'>
       {
        isdash&&<Dashboard/>
       }
       {
        isprosec&&<GetAllproduct/>
       }
       {
        issales&&<Sales/>
       }
       {
        isuser&&<GetAllUsers/>
       }
       {
        isadd&&<Addproduct/>
       }
        </motion.container >


    </div>
  )
}

export default Admin