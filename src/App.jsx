import AddToCart from './navItems/AddToCart';
import Login from './navItems/Login';
import ProductList from './navItems/ProductList';
import Signup from './navItems/Signup';
import Home from './navItems/Home';
import Style from './App.module.css';
import logoImg from './assets/logo.jpg';
import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router,Routes, Route,NavLink} from 'react-router-dom';
const SearchBar=()=>{
    return (
        <div className={Style.searchContainer}>
          <input type="search" placeholder="Enter search item" className={Style.searchInput} />
          <i className={`fa-solid fa-magnifying-glass ${Style.searchIcon}`}></i>
        </div>
      );

}
function App() {

    const[menuOpen,setMenuOpen] = useState(false);
    const toggleMenu =()=>
    { setMenuOpen((prev)=>!prev); }
    return (
       <>
        <Router>
            <div>
            {/* here doing the overlay task */}
              <nav className={`${Style.navbarContainer}`}>
                    {/* Logo */}
                { menuOpen &&
                <div className ={Style.overlay} onClick={toggleMenu}> 
                    <div className={Style.menuWrapper}>
                       
                        <a href="http://localhost:5173/">Home <i class="fa-solid fa-house" ></i></a>
                       <a href="http://localhost:5173/productList">ProductList<i class="fa-solid fa-rectangle-list"></i>
                       </a>
                        <a href="http://localhost:5173/login">Login<i class="fa-solid fa-right-to-bracket"></i>
                        </a>
                        <a href="http://localhost:5173/signUp">Signup <i class="fa-solid fa-user-plus"></i>
                        </a>
                        <a href="http://localhost:5174/addToCart">add To cart                                <i class="fa-solid fa-cart-shopping"></i>
                        </a>
                        <a>logout<i className="fa-solid fa-right-from-bracket" style={{ fontSize:"1.5rem", color: "blue" }}></i>
                        </a> 
                     
                    </div>

                </div>
                }
                        <div className={Style.hamburgerContainer}>
                          <button data-type="false"  onClick={toggleMenu}>
                             <i className={`fa-solid ${menuOpen?"fa-xmark":"fa-bars"}`}></i>
                          </button>
                       </div>

                        <div className={Style.imgContainer}>
                          <img src={logoImg}/> 
                          <span>KBS</span>
                       </div>
                      {/* border:"3px solid blue" */}
                   <div style={{display:'flex',justifyContent:'space-between',width:'100%',padding:"0px 5px"}}>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                <span>Home</span> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/productList" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                               <span> Product List</span>
                                <i class="fa-solid fa-rectangle-list"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                               <span> Login</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signUp" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                <span>Sign Up</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/addToCart" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                               <span> Add to Cart</span>
                            </NavLink>
                        </li>
                        
                    </ul>

                    {/* here defining the search item */}
                    <SearchBar/>
                
                    <div className={Style.logoutContainer}>
                    {/* <i class="fa-solid fa-right-from-bracket"></i> */}
                     <i className="fa-solid fa-right-from-bracket" style={{ fontSize:"1.5rem", color: "blue" }}></i>
                     <span>logout</span>
                    </div>

                    </div>    
                 
                </nav>

                
                <div>
                 <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/productList" element={<ProductList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<Signup />} />
                    <Route path="/addToCart" element={<AddToCart />} />
                </Routes>
                </div>
            </div>
        </Router>
        </>
    );
}

export default App;




