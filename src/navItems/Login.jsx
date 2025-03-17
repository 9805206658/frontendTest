// import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import Style from '../navItems/login.module.css';
import Style1 from '../navItems/Signup.module.css';
import {faEye, faListSquares} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import createNotification from "../notification/notification";

const schema = yup.object().shape({
    password: yup.string()
        .min(10, "Password must be at least 10 characters")
        .max(16, "Password must not exceed 16 characters")
        .required("Password is required"),
        phone: yup.string()
        .matches(/^[0-9]+$/, "Contact Number must be digits")
        .required("Contact Number is required"),
    userType:yup.string().required("required type of the user")
});
export const CreateInputField = ({ type, name,value, labelName, placeHolder = "", register, errors,  logo1=""  ,logo = "" ,extraField={},handleChange}) => {
    // here getting global state
    console.log("loggogog");
    console.log(logo1);
    const [isPassword,setIsPassword]=useState(true);
    return (
        <div className={`${Style.flexCol} ${Style.inputWrapper} `}>
            <label htmlFor={name}>{labelName}</label>
            <div className={`${Style.flexRow} ${Style.inputContainer}`}>
                <input 
                    type={isPassword==false?"text":type}
                    id={name} 
                    placeholder={placeHolder} 
                     {...(register?register(name):{})}
                    {...extraField}
                    value={value} 
                    onChange={handleChange}
                />
                {logo && <FontAwesomeIcon icon={isPassword?logo:logo1}  onClick={()=>
                    { setIsPassword((prev)=>!prev);}
                } />}
            </div>
            {errors[name] && <span className="text-red-800 text-2xl mt-1">{errors[name].message}</span>}
        </div>
    );  
};

// Login component
const Login = ({ isLoginOpen, loginController}) => {
    const creadentail = useSelector((state)=>{return state.auth});
    console.log(creadentail);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const formSubmit = async (formData) => {
           try {
                console.log(formData);
                dispatch(loginUser(formData));      
             } 
           catch (err)
            { 
                console.log(err);
                createNotification({
                    isSuccess: false,
                    description: err.data?.error || "An unexpected error occurred",
                    placement: "topRight",
                    duration: 2,
                  });
            }
    };


    useEffect(() => {
        if (creadentail.isLogin) {
            loginController();
            navigate(creadentail.userType === 'Buyer' ? '/addItems' : '/');
        }
    }, [creadentail.isLogin, creadentail.userType, loginController, navigate]);

   
    
    useEffect((e)=>{
        //  creadentail.isLogin == true && creadentail.userType == 'Buyer'
     
        if(creadentail.isLogin == true && creadentail.userType == 'Seller')
        { // navigating to the homepage
           navigate('/sellerMenu');    
        }
        if(creadentail.isLogin == true && creadentail.userType == 'Buyer'){
            navigate('./');   
        }

    },[creadentail.isLogin, creadentail])
   
   return (
        <>
            {isLoginOpen &&
            <div className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900  ${Style.wholeWrapper}`}>
             < div className={`g-white rounded-lg shadow-lg max-w-md w-full p-6 ${Style.loginWrapper}`} >
                        <button
                            className="text-gray-500 float-right text-2xl"
                            onClick={() => loginController()}>
                            &times;
                        </button>
                        <h1 className="font-bold text-3xl mb-4">Login Here</h1>
                        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(formSubmit)}>
                            <CreateInputField
                                type="number"
                                name="phone"
                                labelName="Contact Number"
                                placeHolder="Enter your contact number"
                                register={register}
                                errors={errors}
                                logo=""
                                extraField={""}
                            />
                            <CreateInputField
                                type="password"
                                name="password"
                                labelName="Password"
                                placeHolder="Enter your password"
                                register={register}
                                errors={errors}
                                 logo={faEye}
                                 extraField={""}
                                 logo1={faEyeSlash}
                            />

                            <div className={`${Style1.userWrapper} ${Style1.flexCol}`}>
                                 <label className={Style1.headTitleBold}>User:</label>
                                 <div className={Style1.userContainer}>
                                     <label htmlFor="seller">
                                         <input type="radio" className = {`${Style1.inputStyle}`} name="userType" id="seller" value="Seller" {...register("userType")}/> Seller
                                     </label>
                                     <label htmlFor="buyer">
                                         <input type="radio" className = {`${Style1.inputStyle}`}  name="userType" id="buyer" value="Buyer" {...register("userType")}/> Buyer
                                     </label>
                                     {errors["userType"] && <span className={Style1.error} > {errors["userType"].message}</span>}
                                  </div>
                             </div>
                            <button type="submit" className={Style1.btnSignup}>
                                Login
                            </button>
                            <span className="text-red-800 text-sm"></span>
                        </form>
                        <div className="flex justify-between">
                        <span className="text-red-500">didn't have account ?</span> <span onClick={() => { 
                            loginController();
                            navigate("/signUp");
                             }} className="text-blue-500">create Account</span> </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Login;






