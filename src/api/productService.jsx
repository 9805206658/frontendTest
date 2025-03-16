import axiosClient from "./axiosClient";

export const getSingleProduct = async (productId) => {
  try {
    const res = await axiosClient.get(`getSingleProduct/${productId}`);
    return res.data.message;
  } catch (err) {
    console.error("Error fetching product:", err);
  }
};

export const inDec =(event,setCountQuantity,quantity)=>{
    // console.log(setCountQuantity);
    console.log(event.currentTarget.getAttribute("data-value"));
    if(event.currentTarget.getAttribute("data-value") == '+')
    {
      setCountQuantity((prev)=>{
        if(prev < quantity )
        {return prev+1;}
        return prev;  
      });
    }
    else{ 
      setCountQuantity((prev)=>{
        if(prev > 1)
        {return prev-1 }
        return prev;
      });
    }
}


