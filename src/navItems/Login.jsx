// import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginUser } from "../redux/userSlice";
import Style from '../navItems/login.module.css';
import Style1 from '../navItems/Signup.module.css'; // Assuming you have a CSS module

import {  faEye } from "@fortawesome/free-solid-svg-icons";
const schema = yup.object().shape({
    password: yup.string()
        .min(10, "Password must be at least 10 characters")
        .max(16, "Password must not exceed 16 characters")
        .required("Password is required"),
        contactNumber: yup.string()
        .matches(/^[0-9]+$/, "Contact Number must be digits")
        .required("Contact Number is required"),
});
export const CreateInputField = ({ type, name, labelName, placeHolder = "", register, errors, logo = "" }) => {
    const [isPassword,setIsPassword]=useState(true);
   
    return (
        <div className={`${Style.flexCol} ${Style.inputWrapper} `}>
            <label htmlFor={name}>{labelName}</label>
            <div className={`${Style.flexRow} ${Style.inputContainer}`}>
                <input 
                    type={isPassword==false?"text":type}
                    id={name} 
                    placeholder={placeHolder} 
                    {...register(name)}  
                />
                {logo && <FontAwesomeIcon icon={logo}  onClick={()=>
                    { setIsPassword((prev)=>!prev);}
                } />}
            </div>
            {errors[name] && <span className="text-red-800 text-sm mt-1">{errors[name].message}</span>}
        </div>
    );
};


// Login component
const Login = ({ isLoginOpen, setIsLoginOpen}) => {
    const dispatch = useDispatch;
    // const credentail = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const formSubmit = async (formData) => {
        try {
            console.log(formData);
            dispatch(loginUser(formData));
        } 
        catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {isLoginOpen &&
            <div className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900  ${Style.wholeWrapper}`}>

                    <div className={`g-white rounded-lg shadow-lg max-w-md w-full p-6 ${Style.loginWrapper}`} >
                        <button
                            className="text-gray-500 float-right text-2xl"
                            onClick={() => setIsLoginOpen()}
                        >
                            &times;
                        </button>
                        <h1 className="font-bold text-3xl mb-4">Login Here</h1>
                        <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(formSubmit)}>
                            <CreateInputField
                                type="number"
                                name="phone"
                                labelName="Contact Number"
                                placeHolder="Enter your contact number"
                                register={register}
                                errors={errors}
                                logo=""
                            />
                            <CreateInputField
                                type="password"
                                name="password"
                                labelName="Password"
                                placeHolder="Enter your password"
                                register={register}
                                errors={errors}
                                 logo={faEye}
                            />
                            <button type="submit"
                                className={Style1.btnSignup}>
                                Login
                            </button>

                            <span className="text-red-800 text-sm"></span>
                        </form>
                        <div className="flex justify-between">
                            <span className="text-red-500">didn't have account ?</span> <span onClick={() => { navigate("/Signup"); }} className="text-blue-500">create Account</span> </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Login;
