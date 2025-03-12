import * as yup from "yup";
import React, { useEffect } from 'react';
import Footer from '../footer/footer';
import Style from '../navItems/Signup.module.css'; 
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../redux/userSlice";
import { logout } from "../redux/userSlice";
import { useSelector } from "react-redux";
import Login from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const schema = yup.object().shape({
    userName:yup.string().min(3,"Full Name must be at least 3 character"),
    userType:yup.string().required("select the user type"),
    phone:yup.string().required("phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    gender:yup.string().required("Gender is required"),
    password: yup
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/^(?=.*[0-9])(?=.*[@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, "Password must contain at least one number and one special character"),
    confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
    email:yup.string().required("email is required").email("invalid format"),
    termsCondition:yup.bool().oneOf([true], "You must agree to the terms and conditions"),
    dob:yup.string().required("data of birth")
})

function Signup() {
    // const credential = useSelector((state)=>state.auth);
    const [isLoginOpen,setIsLoginOpen] = useState();
    const dispatch = useDispatch(); 
    const[isPassword1,setIsPassword1]=useState(true);
    const[isPassword2,setIsPassword2]=useState(true);
   // write functionality for the login
    
    const loginController= ()=>{
        setIsLoginOpen(prev=>!prev);

    };

 const {register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema) });
    const formSubmit = async(formData)=>{
         try{
            alert("enter");
            console.log(formData);
            dispatch(createUser(formData));
          }
         catch(err)
        {  console.log(err.message); }
    }

   
    return (
        <>
        {isLoginOpen && <Login isLoginOpen={isLoginOpen} loginController={loginController} />}
        <div className={`${Style.flexCol} ${Style.wholeSignupWrapper}`}>
            <div className={`${Style.signupHeader} ${Style.flexRow}`}>
                <h2>Create KBS Account</h2>
                <p>Already a member? &nbsp;<button  onClick={()=>{setIsLoginOpen(true)}}>Login here</button></p>
            </div>
            <div className={Style.signupContainer}>
                       <form onSubmit={handleSubmit(formSubmit)}>
                              <div className={`${Style.flexCol}`}>
                                 <div className={`${Style.userWrapper} ${Style.flexCol}`}>
                                        <label className={Style.headTitleBold}>User:</label>
                                        <div className={Style.userContainer}>
                                            <label htmlFor="seller">
                                                <input type="radio" className = {`${Style.inputStyle}`} name="userType" id="seller" value="Seller" {...register("userType")}/> Seller
                                            </label>
                                            <label htmlFor="buyer">
                                                <input type="radio" className = {`${Style.inputStyle}`}  name="userType" id="buyer" value="Buyer" {...register("userType")}/> Buyer
                                            </label>
                                            {errors["userType"] && <span className={Style.error} > {errors["userType"].message}</span>}
                                         </div>
                                 </div>
                                 <div className={` ${Style.flexCol}`}> 
                                       <label htmlFor="phone" className={Style.headTitleBold}>Contact Number:</label>
                                        <input type="tel" className = {`${Style.inputStyle}`}  id="phone" name="phone" placeholder="Enter your contact number" {...register("phone")} />
                                        {errors["phone"] && <span className={Style.error}> {errors["phone"].message}</span>}       
                                </div>

                                <div className={` ${Style.flexCol}`}> 
                                       <label htmlFor="phone" className={Style.headTitleBold}>Email:</label>
                                        <input type="email" className = {`${Style.inputStyle}`}  id="email" name="email" placeholder="Enter your your email" {...register("email")} />
                                        {errors["email"] && <span className={Style.error}> {errors["email"].message}</span>}       
                                </div>

                                 <div className={` ${Style.flexCol}`}>
                                       <label htmlFor="password" className={Style.headTitleBold}>Password:</label>
                                       <div className ={` ${Style.flexCol} ${Style.passwordWrapper}`}>
                                            <div className={`${Style.flexRow}  `} >
                                              <input type={isPassword1?"password":"text"} id="password" name="password" placeholder="Enter your password" {...register("password")}/>
                                              <FontAwesomeIcon icon={faEye} onClick={()=>{setIsPassword1((prev)=>!prev)}}/>
                                           </div>
                                           {errors["password"] && <span className="text-red-800 text-sm mt-1"> {errors["password"].message}</span>}       
                                           <div className={`${Style.flexRow} `} >
                                           <input type={isPassword2?"password":"text"}  id="confirmPassword" placeholder="Confirm your password"  name ="confirmPassword" {...register("confirmPassword")} />
                                            <FontAwesomeIcon icon={faEye} onClick={()=>{setIsPassword2((prev)=>!prev)}}/> 
                                           </div>
                                           {errors["confirmPassword"] && <span className={Style.error} > {errors["confirmPassword"].message}</span>} 
                                       </div>
                                </div>
                                <div className={` ${Style.flexCol}`}>
                                         <label className={Style.headTitleBold}>Gender:</label>
                                         <div className={` ${Style.flexRow} ${Style.genderWrapper}`}>
                                           <label htmlFor="male">
                                               <input type="radio"  name="gender" value="Male" id="male" {...register("gender")} /> Male
                                            </label>
                                            <label htmlFor="female">
                                               <input type="radio" name="gender" value="Female" id="female" {...register("gender")} /> Female
                                            </label>
                                            <label htmlFor="other">
                                               <input type="radio" name="gender" value="Other" id="other"  {...register("gender")}/> Other
                                           </label>
                                      </div>
                                      {errors["gender"] && <span className={Style.error} > {errors["gender"].message}</span>}       
                                 </div>
                     </div>
                         
                         <div className = {`${Style.flexCol}`}>
                                 <div className={`${Style.flexCol}`}>
                                         <label htmlFor="fullname" className={Style.headTitleBold} >Full Name </label>
                                         <input type="text" id="fullname" name="userName"  className = {`${Style.inputStyle}`}  placeholder="Enter your full name" required  {...register("userName")}/>
                                         {errors["userName"] && <span  className={Style.error}> {errors["userName"].message}</span>}       

                                 </div>
                                 <div className={`${Style.flexCol}`}>
                                      <label htmlFor="dob" className={Style.headTitleBold}>Birthday:</label>
                                      <input type="date" name="dob" className = {`${Style.inputStyle}`}  id="dob" {...register("dob")}/>
                              </div>
                              {errors["dob"] && <span  className={Style.error} > {errors["dob"].message}</span>}       

                                 <div>
                                         <input type="checkbox" name="termsCondition" id="termscondition" required {...register("termsCondition")} />
                                         <label htmlFor="termscondition">&nbsp;I accept terms and conditions</label>
                                         {errors["termsCondition"] && <span className={Style.error}> {errors["termsCondition"].message}</span>}        
                                </div>
                       <button type="submit" className={`${Style.btnSignup}`}>Sign Up</button>
                        </div>
                     </form>
                </div>
         </div>
         <Footer/>
      </>    
    );
}

export default Signup;