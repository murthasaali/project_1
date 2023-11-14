
import './App.css';
import { Route, Routes} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';

import Login from './admin/login';
import Addproduct from './admin/addproduct';
import GetAllproduct from './admin/getAllproduct';
import GetaProduct from './admin/getaProduct';
import GetAllUsers from './admin/getAllusers';
import Admin from './admin/admin';
import Home from './user/home';
import Mainbar from './user/mainbar';


function App() {
  return (
    <div className="App">
   
     <BrowserRouter>
    

     <Routes>
      <Route path='/'  element={<Home/>}/>
    {/* //  <Route path='/userlogin'  element={<Login/>}/> */}
      <Route path='/admin'  element={<Admin/>}/>
      <Route path='/admin/user' element={<Admin />} />
          {/* //  <Route path='/admin/addproduct' element={<Admin />} /> */}
            <Route path='/admin/sales' element={<Admin />} />
            <Route path='/admin/prosec' element={<Admin />} />
            <Route path='/admin/add' element={<Admin />} />
      <Route path='/addproduct'  element={<Addproduct/>}/>
      <Route path='/getallpro'  element={<GetAllproduct/>}/>
      <Route path='/getapro'  element={<GetaProduct/>}/>
      <Route path='/getallusers'  element={<GetAllUsers/>}/>
     </Routes>
     
  
     </BrowserRouter>
    </div>
  );
}

export default App;
