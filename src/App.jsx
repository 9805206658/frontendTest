import AddToCart from './navItems/AddToCart';
import Login from './navItems/Login';
import ProductList from './navItems/ProductList';
import SignUp from './navItems/Signup';
import Home from './navItems/Home';
import Style from './App.module.css';
import logoImg from './assets/logo.jpg';
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
    return (
       <>
        <Router>
            <div>
              <nav className={`${Style.navbarContainer}`}>
                    {/* Logo */}
                    <div className={Style.imgContainer}>
                      <img src={logoImg}/> 
                      <span>KBS</span>
                    </div>
                    {/* border:"3px solid blue" */}
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',padding:"0px 5px"}}>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/productList" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                Product List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signUp" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                Sign Up
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/addToCart" className={({ isActive }) => isActive ? `${Style.link} ${Style.active}` : Style.link}>
                                Add to Cart
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
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/addToCart" element={<AddToCart />} />
                </Routes>
                </div>
            </div>
        </Router>
        </>
    );
}

export default App;




// function App()
// {
//     return( 
//     <>
//     {/* <h2>this is the hellow world page</h2> */}
//     <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//     </>)
// }
// export default App;
