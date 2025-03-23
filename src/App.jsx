import AddToCart from './navItems/AddToCart';
import ProductList from './navItems/ProductList';
import Signup from './navItems/Signup';
import Login from './navItems/Login';
import Home from './navItems/Home';
import Style from './App.module.css';
import logoImg from './assets/logo.jpg';
import { useState } from 'react';
import { logout } from './redux/userSlice';
import AddItems from './seller/addItems';
import ProductDetail from './product/productDetail';
import { useNavigate } from 'react-router-dom';
import PaymentDetail from './payment/payment';
import Profile from './navItems/profile';
import { useDispatch,useSelector } from 'react-redux';
import { BrowserRouter as Router,Routes, Route,NavLink} from 'react-router-dom';
import SellerMenu from './seller/sellerMenu';
const SearchBar=()=>{
   // here peforming search bar functinality
    return (
        <div className={Style.searchContainer}>
          <input type="search" placeholder="Enter search item" className={Style.searchInput} />
          <i className={`fa-solid fa-magnifying-glass ${Style.searchIcon}`}></i>
        </div>
      );

}
const ProfilePicture=()=>{
    const userName= localStorage.getItem('userName');
    const navigate = useNavigate();
    const profileClick=()=>{
        navigate('/profile');
    }

    return(
        <>
        {userName &&
        <div onClick={profileClick} className={Style.profileWrapper}>
             <i class="fa-solid fa-user"></i>
            <span>{userName}</span>
        </div>
        }
         </>
    )
}
function App() {
    // here creating state 
    const dispatch = useDispatch();
    
    const [isLoginOpen,setIsLoginOpen] = useState(false);
    const loginHandler=(e)=>{
        // e.preventDefault();
        dispatch(logout);
        setIsLoginOpen(prev=>!prev);
    }
    const loginController =()=>{
        setIsLoginOpen((prev)=>!prev);
    }
    const[menuOpen,setMenuOpen] = useState(false);
    const toggleMenu =()=>
    { setMenuOpen((prev)=>!prev); }
    return (
       <>
        <Router>
            <div>
            {isLoginOpen &&<Login isLoginOpen={isLoginOpen} loginController={loginController}    onClick={loginHandler}/>}
              {/* here doing the overlay task */}
              <nav className={`${Style.navbarContainer}`}>
                    {/* Logo */}
                { menuOpen &&
                <div className ={Style.overlay} onClick={toggleMenu}> 
                    <div className={Style.menuWrapper}>
                    <div className={Style.overlay} onClick={toggleMenu}>
                            <div className={Style.menuWrapper}>
                                <NavLink to="/" onClick={toggleMenu}>Home <i className="fa-solid fa-house"></i></NavLink>
                                <NavLink to="/productList" onClick={toggleMenu}>Product List <i className="fa-solid fa-rectangle-list"></i></NavLink>
                                <button  onClick={loginHandler}> Login   <i className="fa-solid fa-right-to-bracket"></i> </button>
                                <NavLink to="/signUp" onClick={toggleMenu}>Signup <i className="fa-solid fa-user-plus"></i></NavLink>
                                <NavLink to="/addToCart" onClick={toggleMenu}>Add To Cart <i className="fa-solid fa-cart-shopping"></i></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                }      <div className={Style.hamburgerContainer}>
                          <button data-type="false"  onClick={toggleMenu}>
                             <i className={`fa-solid ${menuOpen?"fa-xmark":"fa-bars"}`}></i>
                          </button>
                       </div>

                        <div className={Style.imgContainer}>
                          <img src={logoImg}/> 
                          <span>KBS</span>
                       </div>
                      {/* border:"3px solid blue" */}
                     
                   <div className={Style.navItemContainer}>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                <span>Home</span> 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/productList" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                               <span> Product List</span>
                                <i className="fa-solid fa-rectangle-list"></i>
                            </NavLink>
                        </li>
                        <li>
                             
                           <button className={Style.link} onClick={loginHandler}> Login</button>
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
                    
                    <ProfilePicture/>
                    <SearchBar/>
                    <div className={Style.logoutContainer} onClick={(e)=>{
                        e.preventDefault();
                        dispatch(logout());
                        alert("logout successfully");
                        
                    }}>
                    {/* <i className="fa-solid fa-right-from-bracket"></i> */}
                     <i className="fa-solid fa-right-from-bracket" style={{ fontSize:"1.5rem", color: "blue" }}></i>
                     <span>logout</span>
                    </div>
                    </div>    
                  
                  </nav> 
                <div>
                 <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/productList" element={<ProductList />} />
                    <Route path="/signUp" element={<Signup />} />
                    <Route path="/addToCart" element={<AddToCart />} />
                    <Route path="/addItems" element={<AddItems/>} />
                    <Route path="/productDetail" element ={<ProductDetail/>}/>
                    <Route path="/login" element={<Login  isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}/>} />
                    <Route path="/paymentDetail" element={<PaymentDetail/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/sellerMenu" element={<SellerMenu/>} />
                </Routes>
                </div>
            </div>
        </Router>
        </>
    );
}

export default App;




