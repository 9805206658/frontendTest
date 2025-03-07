import React from 'react';
import Footer from '../footer/footer';
import Style from '../navItems/Signup.module.css'; 
function Signup() {
    return (
        <>
        <div className={`${Style.flexCol} ${Style.wholeSignupWrapper}`}>
            <div className={`${Style.signupHeader} ${Style.flexRow}`}>
                <h2>Create KBS Account</h2>
                <p>Already a member? &nbsp;<a href="http://localhost:5173/login">Login here</a></p>
            </div>
            <div className={Style.signupContainer}>
                       <form>

                         <div className={`${Style.flexCol}`}>
                                 <div className={`${Style.userWrapper} ${Style.flexCol}`}>
                                        <label className={Style.headTitleBold}>User:</label>
                                        <div className={Style.userContainer}>
                                            <label htmlFor="seller">
                                                <input type="radio" name="user" id="seller" value="seller" /> Seller
                                            </label>
                                            <label htmlFor="buyer">
                                                <input type="radio" name="user" id="buyer" value="buyer" /> Buyer
                                            </label>
                                         </div>
                                 </div>

                                 <div className={` ${Style.flexCol}`}> 
                                       <label htmlFor="phone" className={Style.headTitleBold}>Contact Number:</label>
                                        <input type="tel" id="phone" placeholder="Enter your contact number" />
                                        
                                </div>


                                 <div className={` ${Style.flexCol}`}>
                                       <label htmlFor="password" className={Style.headTitleBold}>Password:</label>
                                       <div className ={` ${Style.flexCol}`}>
                                           <input type="password" id="password" placeholder="Enter your password" />
                                           <input type="password" id="confirmpassword" placeholder="Confirm your password" />
                                       </div>
                                </div>
                                <div className={` ${Style.flexCol}`}>
                                         <label className={Style.headTitleBold}>Gender:</label>
                                         <div className={` ${Style.flexRow}`}>

                                            <label htmlFor="male">
                                               <input type="radio" name="gender" value="male" id="male" /> Male
                                            </label>
                                            <label htmlFor="female">
                                               <input type="radio" name="gender" value="female" id="female" /> Female
                                            </label>
                                            <label htmlFor="other">
                                               <input type="radio" name="gender" value="other" id="other" /> Other
                                           </label>
                                      </div>
                                 </div>

                                <div className={`${Style.flexCol}`}>
                                      <label htmlFor="dob" className={Style.headTitleBold}>Birthday:</label>
                                      <input type="date" id="dob" />
                              </div>


                     </div>
                         
                         <div className = {`${Style.flexCol}`}>
                                 <div className={`${Style.flexCol}`}>
                                         <label htmlFor="fullname" className={Style.headTitleBold}>Full Name *</label>
                                         <input type="text" id="fullname" name="fullName" placeholder="Enter your full name" required />
                                 </div>
                                 <div>
                                         <input type="checkbox" name="terms" id="termscondition" />
                                         <label htmlFor="termscondition">&nbsp;I accept terms and conditions</label>
                                </div>
        
                                <div>
                                        <button type="submit" className={`${Style.btnSignup}`}>Sign Up</button>
                                </div>
                        </div>
                    

                    </form>
                   
             </div>
         </div>
         <Footer/>
      </>


        
    );
}

export default Signup;