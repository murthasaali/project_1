import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, selectToken, setProducts as setProductsAction } from '../redux/authSlice'; // Rename setProducts to setProductsAction
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
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
function GetAllproduct() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleToggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  const token = useSelector(selectToken);
  const products = useSelector(selectProducts); // Rename setProducts to products
  const dispatch = useDispatch();
  const [isEdit,setIsedit]=useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProductData,setupdatedProductData]=useState(null)

  const dealerToken = token;

  // const getAllProducts = async (token) => {
  //   try {
  //     const response = await axios.get('https://ecommerce-api.bridgeon.in/products?accessKey=55eebc5550c70b2b7736', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const { status, message, data } = response.data;
  //     if (status === 'success') {
  //       // Successfully fetched products.
  //       dispatch(setProductsAction(data)); // Use setProductsAction instead of setProducts
  //       console.log('Fetched products:', data);
  //     } else {
  //       console.error('Product retrieval failed. Message:', message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };


  //   getAllProducts(dealerToken);
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
        dispatch(setProductsAction(data)); // Use setProductsAction instead of setProducts
        console.log('Fetched products:', data);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    getAllProducts(dealerToken);
  }, [updatedProductData]);

  

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const deleteProduct = async (productId, token) => {
    try {
      const response = await axios.delete(`https://ecommerce-api.bridgeon.in/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Successfully deleted the product.
        console.log('Product deleted.');
        // Call the API again to refresh the product list
        getAllProducts(token);
      } else {
        console.error('Product deletion failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const handleDelete = (productId) => {
    deleteProduct(productId, token)
  };
  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    console.log(productToEdit);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsedit(true);
    }
  };
  
  const handleUpdateProduct = async (productId,updatedProductData, token) => {
    try {
      const response = await axios.patch(`https://ecommerce-api.bridgeon.in/products/${productId}`, updatedProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully updated the product.
        console.log('Updated product details:', data);
        // Call the API again to refresh the product list
        getAllProducts(token);
        setIsedit(false); // Hide the edit section after successful update
        alert(`succussfully updated  ${updatedProductData.title}`)
      } else {
        console.error('Product update failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      
      setIsedit(false)
    }
  };

  return (
    <div className='p-4 flex justify-center items-center flex-col'>
       <div className='h-20  flex justify-center items-center w-full'>
      <motion.button
        onClick={handleToggleSearch}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
       <FaSearch className='text-3xl font-thin text-white first-letter  '/>
      </motion.button>

      {isSearchVisible && (
        <motion.input
          type="text"
          className='bg-white bg-opacity-50 w-3/4 h-14 rounded-3xl pl-4'
          placeholder="Search..."
          initial={{ opacity: 0, x: '-20%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-50%' }}
        />
      )}
    </div>
   
      <motion.table className="w-full bg-fuchsia-200 bg-opacity-60 text-black font-sans  rounded-xl"
           variants={container} 
           initial="hidden"
           animate="visible">
          <thead>
            <tr className="">
              <th className="py-2 px-4 w-1/12 sm:w-1/6">ID</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/3">Title</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/3">Price</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Category</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Image</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Description</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Edit</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Delete</th>
            </tr>
          </thead>
          <tbody >
            {products.map((product, index) => (
              <tr  key={product._id} className='' onClick={() => handleProductClick(product)}>
                <motion.td  variants={item} className="py-2 px-4 w-1/12 sm:w-1/6">{index + 1}</motion.td >
                <motion.td  variants={item}  className="py-2 px-4 w-1/6 sm:w-1/3">{product.title}</motion.td >
                <motion.td   variants={item} className="py-2 px-4 w-1/6 sm:w-1/3">{product.price}</motion.td >
                <motion.td   variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">Category Heading</motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">
                  <img src={product.image} alt={product.title} className="w-20 h-20" />
                </motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">{product.description}</motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleEdit(product._id)}>
                    Edit
                  </button>
                </motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleDelete(product._id)}>
                    Delete
                  </button>
                </motion.td >
              </tr >
            ))}
          </tbody>
        </motion.table>
      
      
     {/* Rest of the code remains unchanged */}
     {selectedProduct && (
        <div className='bg-gray-100 p-4 rounded-md mb-4'>
          <h2 className='text-2xl font-bold mb-2'>{selectedProduct.title}</h2>
          <p className='text-lg'>Price: {selectedProduct.price}</p>
          <p className='text-lg'>Description: {selectedProduct.description}</p>
        </div>
      )}

      
       {isEdit && (
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5, ease: "easeOut" } }}
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
  onClick={() => setIsedit(false)}
>
          <motion.div
            initial={{ x: 50,y:50, opacity: 0 }}
            animate={{ x: 0,y:0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            // style={{
            //   background: 'white',
            //   padding: '2rem',
            //   borderRadius: '0.5rem',
            // }}
            onClick={(e) => e.stopPropagation()}
            className='bg-white w-3/4 h-3/4 rounded-xl bg-opacity-70'
            
          >
           <div className='bg-fuchsia-600-800 text-white w-full p-4 rounded-md mb-4'>
          {/* editing process */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
               setupdatedProductData({
                title: e.target.title.value,
                price: e.target.price.value,
                description: e.target.description.value,
                category: e.target.category.value,
              });
              handleUpdateProduct(selectedProduct._id, updatedProductData,token);
            }}
          >
            <input
              type='text'
              name='title'
              placeholder='Title'
              defaultValue={selectedProduct.title}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <input
              type='number'
              name='price'
              placeholder='Price'
              defaultValue={selectedProduct.price}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <input
              type='text'
              name='category'
              placeholder='Category'
              defaultValue={selectedProduct.category}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <textarea
              name='description'
              placeholder='Description'
              defaultValue={selectedProduct.description}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Update Product
            </button>
          </form>
        </div>
            <button onClick={() => setIsedit(false)}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default GetAllproduct;
