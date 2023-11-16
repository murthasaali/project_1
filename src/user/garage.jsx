import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion'; // Import useAnimation from framer-motion
import axios from 'axios';
import { selectIscollection, selectProducts, setIscollection, setProducts } from '../redux/authSlice';
import { selectToken } from '../redux/authSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";

function Garage() {
  const dispatch = useDispatch();
  const isCollection = useSelector(selectIscollection);
  const products = useSelector(selectProducts);
  const token = useSelector(selectToken);

  const controls = useAnimation(); // Initialize useAnimation hook

  const getAllProducts = async (token) => {
    try {
      const response = await axios.get('https://ecommerce-api.bridgeon.in/products?accessKey=55eebc5550c70b2b7736', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched products.
        dispatch(setProducts(data));
        console.log('Fetched products:', products);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getAllProducts(token);
  }, [isCollection]);

  const handleClick = () => {
    dispatch(setIscollection(false));
  };

  return (
    <>
      {isCollection && (
        <motion.div
          initial={{ opacity: 1 }}
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
            backgroundColor:"black",
            zIndex: 999,
            overflow: "scroll", // Apply Framer Motion controls to the overflow property
          }}
          onClick={handleClick}
        >
          <motion.div
            initial={{ y: -50, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            className="w-full h-full bg-no-repeat bg-conatin bg-center  flex-col rounded-lg flex justify-start items-start gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-40 bg-black flex justify-start rounded-lg p-4">
              <p className='text-4xl font-thin text-white text-opacity-75'>Top cars available right now !!!!</p>
              <motion.button
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 right-0 m-4 cursor-pointer"
                onClick={handleClick}
              >
                <IoIosCloseCircleOutline className='text-white text-5xl' />
              </motion.button>
            </div>
            <div className="flex ml-20 flex-wrap justify-start gap-6">
              {products.map((value) => (
                <div className="card w-72 bg-base-500 shadow-xl image-full" key={value._id}>
                  <figure>
                    <img src={value.image} alt="Product" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{value.title}</h2>
                    <p>{value.description}</p>
                    <p>{value.price}</p>
                    <div className="card-actions justify-end">
                      {/* Add any additional actions */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Garage;
