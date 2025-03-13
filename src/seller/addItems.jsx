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
     name:yup.string().required("name is required"),
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
      break:yup.string(),

})
const AddItems=()=>{

        const [isUpload,setIsUpload]  = useState(false);
        const generateUniqueNumber = (min,max)=>{
                return Math.floor(Math.random() * (max - min)) + min; 
        }
        const [uploadFile,setUploadFile] = useState([]);
         // here making the function that generate the unique character 
        const handleChange=(event)=>{
                event.preventDefault();
                if(isUpload==true)
                {
                        setIsUpload((prev)=>!prev);
                        setUploadFile([]);


                }  
                else{
                        setIsUpload((prev)=>!prev);
                }      
                const files = event.target.files;
              for(let i = 0; i < files.length; i++)
              {  // here spliting the files 
                  let fileList = files[i].name.split(".");
                  // 0 filename + unique character + file extension/
                  uploadFile.push(new File([files[i]],fileList[0]+generateUniqueNumber(100,1000)+"."+fileList[fileList.length-1]));
              }
              console.log(uploadFile);
            
        }  

        const { register, handleSubmit, formState: { errors } } = useForm({
              resolver: yupResolver(schema),
          });

        const formSubmit=async (subData)=>{
             let fileNames = [];
             console.log("the upload files");
             console.log(uploadFile);

             for(let j = 0; j<uploadFile.length; j++)
             {fileNames[j] = uploadFile[j].name;}


             console.log('the file names');
             subData.imageName = fileNames;
             const formData = new FormData();
             uploadFile.forEach((file)=>{ 
                formData.append('files',file);
             })
             formData.append('subData',JSON.stringify(subData));
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
                     value="67d10dd723acbb3a0df6ec36"
                     extraField={{disabled:true}}
             />

            <CreateInputField type="text"
                     name="name"
                     labelName="Cycle Name"
                     register={register}
                     errors={errors}
                     logo=""
                     value=""
                    
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

           <CreateInputField type="text"
                     name="break"
                     register={register}
                     labelName="Break"
                     placeHolder="Enter Break of the cycle"
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