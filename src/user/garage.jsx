import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'; // Import useAnimation from framer-motion
import axios from 'axios';
import { selectIscollection, selectProducts, selectUserToken, selectUserid, setIscollection, setProducts } from '../redux/authSlice';
import { selectToken } from '../redux/authSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";

function Garage() {
  const dispatch = useDispatch();
  
  const isCollection = useSelector(selectIscollection);
  const products = useSelector(selectProducts);
  const token = useSelector(selectToken);
  const userToken=useSelector(selectUserToken)
  const userId=useSelector(selectUserid)
  console.log(userId);
  console.log(userToken);

 
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
  }, [isCollection,token]);

  const handleClick = () => {
    dispatch(setIscollection(false));
  };



const handleCart = async (productId) => {
  try {
    console.log("Adding product to cart...");
    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("User Token:", userToken);

    const response = await axios.post(
      `https://ecommerce-api.bridgeon.in/users/${userId}/cart/${productId}`,
      null, // Assuming no data payload, pass null if not needed
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log("Response:", response); // Log the response from the server

    if (response.data.status === 'success') {
      console.log('Product added to cart.');
      alert("product aded")
    } else {
      console.error('Product addition to cart failed. Message:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

  return (
    <>
      {isCollection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
              <p className='text-4xl font-thin text-white text-opacity'>Top cars available right now !!!!</p>
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
              //  <div className='bg-black w-72'>

                <div className="card w-72 bg-white shadow-xl image-full" key={value._id}>
                  <figure>
                    <img src={value.image} alt="Product" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{value.title}</h2>
                    <p>{value.category}</p>
                    <p>{value.price}</p>
                    <div className="card-actions justify-end">
                    <button  onClick={()=>handleCart(value._id)}> book now</button>
                      {/* Add any additional actions */}
                    </div>
                  {/* </div> */}
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
