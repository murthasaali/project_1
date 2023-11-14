import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCartPlus, FaHeart, FaSearch, FaUser } from 'react-icons/fa';

// Variants for different scaling durations
const scaleVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } }, // Change duration as needed
};

function Mainbar() {
  const [isSearch,setIsSearch]=useState(false)
  return (
    <div className="main-bar">
      {/* Company Name */}
      <motion.div
       initial={{ scale: 0 }}
       animate={{ rotate: 360, scale: 1 }}
       transition={{
         type: "spring",
         stiffness: 260,
         damping: 20
       }}
      className="icon-container">
     
    </motion.div>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <ul className='flex gap-4 font-thin text-blue-950'>
          <motion.li variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            About
          </motion.li>
          <motion.li variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            Collection
          </motion.li>
          <motion.li variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            Home
          </motion.li>
          <motion.li variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            Contact
          </motion.li>
        </ul>
        {/* Additional navigation-related content */}
      </div>

      {/* User-related Elements */}
      <div className="flex gap-4">
        <motion.div variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={()=>setIsSearch(true)}>
          <FaSearch />
        </motion.div>
        <motion.span className="username" variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
          Username
        </motion.span>
        <motion.div variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
          <FaUser/>
        </motion.div>
        <motion.div variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
          <FaCartPlus/>
        </motion.div>
        <motion.div variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
          <FaHeart/>
        </motion.div>
        {/* Additional user-related content */}
      </div>
      {isSearch && (
        <motion.div
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
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 999,
          }}
          onClick={() => setIsSearch(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            // style={{
            //   background: 'white',
            //   padding: '2rem',
            //   borderRadius: '0.5rem',
            // }}
            className=' w-3/4 h-3/4 '
            onClick={(e) => e.stopPropagation()}
        
           
          >
          <input type="text" className='bg-stone-300 text-blue-950  w-3/4 h-14 rounded-3xl pl-4 overflow-hidden shadow-md'/>
            
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}

export default Mainbar;
