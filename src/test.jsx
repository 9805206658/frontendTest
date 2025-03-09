import { useState } from "react";
import axiosClient from "../api/axiosClient";
import * as yup from "yup";
import { CreateInputField } from "./CreateHabit";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// Validation schema using Yup
const schema = yup.object().shape({
  userName: yup.string().min(3, "Full Name must be at least 3 characters").required("Full Name is required"),
  contactNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  gender: yup.string().required("Gender is required"),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/^(?=.*[0-9])(?=.*[@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, "Password must contain at least one number and one special character"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  privacyPolicy: yup.bool().oneOf([true], "You must agree to the terms and conditions"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => setIsModalVisible(false);
  const handleOpenModal = () => setIsModalVisible(true);

  const formSubmit = async (formData: any) => {
    try {
      const res = await axiosClient.post(`http://localhost:5000/api/createUser`, formData);
      if (res.status === 200) {
        handleCloseModal();
        navigate("/login");
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isModalVisible ? (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <button
              className="text-gray-500 float-right text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h1 className="font-bold text-2xl mb-2">Register Here</h1>
            <p className="opacity-50 mb-4">Register and get your free account instantly</p>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-y-4">
              <CreateInputField
                type="text"
                name="userName"
                labelName="Full Name"
                placeHolder="Enter your full name"
                register={register}
                errors={errors}
                logo=""
              />
              <CreateInputField
                type="text"
                name="contactNumber"
                labelName="Contact Number"
                placeHolder="Enter your contact number"
                register={register}
                errors={errors}
                logo=""
              />
              <div className="flex gap-x-3">
                <label>
                  <input type="radio" value="Male" {...register("gender")} aria-invalid={!!errors.gender} />
                  Male
                </label>
                <label>
                  <input type="radio" value="Female" {...register("gender")} aria-invalid={!!errors.gender} />
                  Female
                </label>
                <label>
                  <input type="radio" value="Other" {...register("gender")} aria-invalid={!!errors.gender} />
                  Other
                </label>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>
              <div className="flex items-center gap-x-1">
                <input type="checkbox" {...register("privacyPolicy")} id="privacyPolicy" aria-invalid={!!errors.privacyPolicy} />
                <label htmlFor="privacyPolicy" className="text-sm">
                  I agree to the terms & conditions and privacy policy
                </label>
                {errors.privacyPolicy && <p className="text-red-500 text-sm">{errors.privacyPolicy.message}</p>}
              </div>
              <CreateInputField
                placeHolder=""
                type="date"
                name="dateBirth"
                labelName="Date of Birth"
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
              <CreateInputField
                type="password"
                name="confirmPassword"
                labelName="Confirm Password"
                placeHolder="Confirm your password"
                register={register}
                errors={errors}
                logo={faEye}
              />
              <CreateInputField
                type="email"
                name="email"
                labelName="Email"
                placeHolder="Enter your email"
                register={register}
                logo=""
                errors={errors}
              />
              <button
                className="text-white bg-green-500 rounded-md py-2 px-3 w-full transition duration-200 hover:bg-green-600"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={handleOpenModal}
          className="bg-gradient-to-r from-cyan-600 to-green-500 rounded-md text-white font-bold px-10 py-3 my-20"
        >
          Sign Up Here
        </button>
      )}
    </>
  );
};

export default SignUp;
