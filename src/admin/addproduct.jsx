import React, { useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Addproduct() {
  const token = useSelector(selectToken);
   const formRef = useRef(null); 
  const [state, setState] = useState([]);
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
 const form = formRef.current; // get the form element from the ref
    const title = form.name.value;
    const price = form.price.value;
    const description = form.description.value;
    const category = form.catogery.value;// fixed typo here
    setState([...state, { title: title, description: description, price: price, category: category }]); // updated state setting
    
    try {
      const response = await axios.post(
        'https://ecommerce-api.bridgeon.in/products',
        {
          title: title,
          price: price,
          description: description,
          category: category, // updated the field to match the server's requirement
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Product added successfully.
        console.log('Product added. Product details:', data);
        form.reset()
      } else {
        console.error('Product addition failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Add Product</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4 max-w-md" ref={formRef}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="catogery"
            id="catogery"
            placeholder="Category"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            name="description"
            id="description"
            placeholder="Product Description"
            className="border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Product Price"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
      <button
        onClick={() => navigate('/getallpro')}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        View All Products
      </button>
      <button
        onClick={() => navigate('/getallusers')}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        View All users
      </button>
    </div>
  );
}

export default Addproduct;
