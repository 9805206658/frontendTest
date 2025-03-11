import Style from '../footer/footer.module.css';
import google from '../assets/companyLogo/google.png';
import microsoft from '../assets/companyLogo/microsoft.png';
import infosys from '../assets/companyLogo/infosys.png';
import amazon from '../assets/companyLogo/amazon.png';
import shopify from '../assets/companyLogo/shopify.png';
import { useNavigate } from 'react-router-dom';

const Footer =()=>
{ 
    const navigate = useNavigate();
    return (
    
    <div>     
       <footer> 
        <div className={Style.footerHeader}>
           <span className="companyName"> JOIN KINETIC BICYCLE SHOP AND GET  off </span> 
            <button><a onClick={
                ()=>{(navigate("/signUp")); }
                }>SIGN UP FOR FREE </a> <i className="fa-solid fa-arrow-right"></i></button>
        </div>
        <div  className={Style.footerContainer}>
            <div className={Style.footerItem}>
               <h6 className={Style.footerItemTitle}>TYPES OF BIKES</h6>
               <li><a href="#">Road Bikes</a></li>
               <li><a href="#">Mountain Bikes</a></li>
               <li><a href="#">Hybrid and Commuter</a></li>
               <li><a href="#">Speciality Bike</a></li>
             </div>
            <div className={Style.footerItem}>
                <h6 className={Style.footerItemTitle}>SPORTS</h6>
                     <li><a href="#">Cricket</a></li>
                     <li><a href="#">Runing</a></li>
                     <li><a href="#">Football</a></li>
                     <li><a href="#">Gym|Training</a></li>
                     <li><a href="#">Tenish</a></li>
            </div>

            <div className={Style.footerItem}>
            <h6 className={Style.footerItemTitle}>Support</h6>

                     <li><a href="#">Help</a></li>
                     <li><a href="#">Customer Services</a></li>
                     <li><a href="#">Returns&Exchanges</a></li>
                     <li><a href="#">Shipping</a></li>
                     <li><a href="#">Store Finder</a></li>
            </div>

            <div className={Style.footerItem}>
                <h6 className={Style.footerItemTitle} >COMPNAY INFO</h6>
                   
                     <li><a href="#">About Us</a></li>
                     <li><a href="#">KBS stores</a></li>
                     <li><a href="#">KBS apps</a></li>
                     <li><a href="#">Entity Details</a></li>
                     <li><a href="#">Careers</a></li>
                 
            </div>
            <div className={Style.footerItem}>
                  <h6 className={Style.footerItemTitle} >PARTNER COMPANY</h6>
                       <div>
                             <li>
                           
                                    <a href="https://www.google.com/">
                                      <img src={google} alt="Google"/>
                                    </a>
                             </li>
                             <li>
                                     <a href="https://www.microsoft.com/en-us/">

                                        <img src={microsoft} alt="Microsoft"/>

                                     </a>
                             </li>
                             <li>
                                    <a href="https://www.infosys.com/">

                                        <img src={infosys} alt="Infosys"/>
                                     </a></li>
                             <li>    <a href="https://www.amazon.com/">

                                         <img src={amazon} alt="Amazon"/>
                                     </a>
                             </li>
                             <li>   <a href="https://www.shopify.com/">

                                        <img src={shopify} alt="Shopfiy"/>
                                    </a>
                            </li>
                  </div>
            </div>

            <div className={`${Style.footerItem}`}>
                 <h6 className={`${Style.footerItemTitle}`} >Follow Us</h6>
                 <div>
                    <li> 
                        <a href="https://www.instagram.com/?hl=en">
                          <i className="fa-brands fa-instagram"></i>
                         </a>
                    </li>
                    <li>
                         <a href="https://www.linkedin.com/feed/">
                          <i className="fa-brands fa-linkedin"> </i>  
                         </a>
                    </li>
                    <li> 
                         <a href="https://www.facebook.com/photo?fbid=1873035576181106&set=pcb.1873037882847542">
                         <i className="fa-brands fa-facebook"></i>
                        </a>
                    </li>
             </div>
         </div>
        </div>
        </footer>
    </div>
    )
}
export default Footer;