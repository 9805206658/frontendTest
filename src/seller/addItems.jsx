import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import  {CreateInputField } from "../navItems/Login";
import Style from '../seller/addItems.module.css'
import Footer from "../footer/footer";
import Style1 from "../navItems/Signup.module.css";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
// here defining sche
const schema=yup.object().shape({
      sellerId:yup.string(),
      brand:yup.string().required("brand name is required"),
      weight:yup.number().required("weight is required"),
      color:yup.string().required("color is required"),
      frameMaterial:yup.string().required("frame material required"),
      price:yup.number(),
      description:yup.string(),
      warrentyPeriod:yup.number(),
      quantity:yup.number(),
      imageName:yup.string(),

})
const AddItems=()=>{

        const generateUniqueNumber = (min,max)=>{
                return Math.floor(Math.random() * (max - min)) + min; 
        }
        const [uploadFile,setUploadFile] = useState([]);
         // here making the function that generate the unique character 
        const handleChange=(event)=>{
                const files = event.target.files;
              //    rename the file 
              for(let i = 0; i < files.length; i++)
              {  // here spliting the files 
                  let fileList = files[i].name.split(".");
                  // 0 filename + unique character + file extension/
                  uploadFile.push(new File([files[i]],fileList[0]+generateUniqueNumber(100,1000)+"."+fileList[fileList.length-1]));
              }
            
        }  

        const { register, handleSubmit, formState: { errors } } = useForm({
              resolver: yupResolver(schema),
          });

        const formSubmit=async (subData)=>{
                console.log("the sub data is");
                console.log(subData);
             let fileNames = [];
             for(let j = 0; j<uploadFile.length; j++)
             {fileNames[j] = uploadFile[j].name;}
             //   taking the name
             subData.imageName = fileNames;
             console.log("the subData is");
             console.log(subData);
             const formData = new FormData();
             uploadFile.forEach((file)=>{
                formData.append('files',file);
             })
             formData.append('subData',JSON.stringify(subData));
             console.log("the formData is ");
             console.log(formData);
             try
             {
              const res = await axiosClient.post("createProduct",formData);
              console.log(res);
             }
             catch(err)
             {  console.log("error :"+err);  }
               
      }
   return (<>
   <div className = {`${Style.wholeAddItemsWrapper}`}>
      <h2 className={`${Style.formTitle}`}>Enter Cycle Information</h2>
     <form onSubmit={handleSubmit(formSubmit)} className ={`${Style.addItemsWrapper}`}>

            <CreateInputField type=""
                     name="sellerId"
                     labelName="sellerId"
                     disabled
                     register={register}
                     errors={errors}
                     logo=""
                     value="67cd86ea2727842d79ee7341"
                     extraField={{disabled:true}}
             />

              <CreateInputField type="text"
                     name="brand"
                     labelName="Brand"
                     placeHolder="Enter the cycle brand name"
                     register={register}
                     errors={errors}
                     logo=""
                     extraField={""}
             />


           <CreateInputField type="number"
                     name="weight"
                     labelName="Weight"
                     placeHolder="Enter the weight of cycle"
                     register={register}
                     errors={errors}
                     logo=""
                     extraField={""}
             />
               <CreateInputField type="text"
                     name="color"
                     labelName="Color"
                     placeHolder="Enter the color of the cycle"
                     register={register}
                     errors={errors}
                     logo=""
                     extraField={""}
             />
            
              <CreateInputField type="text"
                     name="frameMaterial"
                     register={register}
                     labelName="frameMaterial"
                     placeHolder="Enter frameMaterial of the cycle"
                     errors={errors}
                     logo=""
                     extraField={""}
             />



              <CreateInputField
                   type="number"
                     name="price"
                     labelName="Price"
                     placeHolder="Enter the price of the cycle"
                     register={register}
                     errors={errors}
                     logo=""
                     extraField={""}
             />

  
             <CreateInputField type="text"
                     name="description"
                     labelName="Description"
                     placeHolder="Enter the Description of the cycle"
                     register={register}
                     errors={errors}
                     logo=""
                     extraField={""}
             />
              <CreateInputField type="number"
                     name="warrentyPeriod"
                     labelName="Warrenty Period"
                     placeHolder="Enter the WarrentyPeriod of the cycle"
                     register={register}
                     errors={errors}
                     logo=""
                     extraField={""}
             />

            <CreateInputField type="Number"
                     name="quantity"
                     labelName="Quantity"
                     placeHolder="Enter the Quanti of the cycle"
                     register={register}
                     errors={errors}
                     extraField= {{min:1,max:10}}
                     logo=""
             />
             <CreateInputField type="file"
                     name="files"
                     labelName="Files"
                     placeHolder=""
                     errors={errors}
                     extraField= {{multiple:true}}
                     logo=""
                     handleChange={handleChange}
             />
             

             <div>
               <button type="submit" className={`${Style1.btnSignup}`}>submit</button>
             </div>
          
             
       </form>
       <Footer/>
      </div>     
</>);
}
export default AddItems;