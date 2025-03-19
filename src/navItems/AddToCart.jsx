import Style from "../navItems/AddToCart.module.css"
import Style1 from "../product/product.module.css";
import Footer from "../footer/footer";
import PaymentDetail from "../payment/payment";
import axiosClient from "../api/axiosClient";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import createNotification from "../notification/notification";
import { inDec } from "../api/productService";
import { getSingleProduct } from "../api/productService";
import axios from "axios";

const updateIsCheck =async(isCheckAll,cartId,buyerId,checkStatus,setIscheckUpdate)=>{
  const updateInfo={isAllCheck:isCheckAll,cartId:cartId,buyerId:buyerId,checkStatus:checkStatus};
  try{
     const res =await axiosClient.put("/updateIsCheck",{isAllCheck:isCheckAll,cartId:cartId,buyerId:buyerId,checkStatus:checkStatus});
     if(res.status == 201)
     { 
      console.log("update");
      setIscheckUpdate(prev =>prev+1);
    }
   }
  catch(err)
  { console.log(err); }
 }


const OrderSummary=({cartInfo})=>
{
  let subTotal = 0;
  let total=0;
  let tax = 0;

   for(let i= 0; i < cartInfo.length; i++)
   { 
    if(cartInfo[i].isCheck) 
    {
    subTotal += cartInfo[i].totalPrice*cartInfo[i].quantity;
    }
  }
   tax = subTotal*0.13;
   total = tax+175+subTotal;
  const navigate = useNavigate();
  const ptcHandler=()=>{
    const paymentDetail={
       subTotal:subTotal,
       total:total,
       tax:tax,
       charge:175
    }
    navigate('/paymentDetail',{state:{paymentDetail:paymentDetail}});
  }
  return(
    <>
    <div className={`${Style.orderSummaryWrapper} ${Style.flexCol}`}>  
      <h2>Order Summary</h2> 
          <div className={`${Style.flexRow}`}>
             <span>Subtotal&nbsp;({cartInfo.length}&nbsp;item)</span>
             <span>{subTotal}</span>
          </div>
          <div className={`${Style.flexRow}`}>
             <span>shipping Fee</span>
             <span>175</span>
          </div>
          <div className={`${Style.flexRow}`}>
            <input type="number" placeholder="Enter voucher code"/>
            <button className={Style.btn}>Apply</button> 
          </div>
          <div className={`${Style.flexRow}`}>
             <span>Total</span>
             <span>{total}</span>
          </div>
          <button className={`${Style.btn}`} onClick={ptcHandler}>
            proceed to checkout 
          </button>
    </div>
  </>

  )
}


const CartItem=({cart,setIsDelete,setIscheckUpdate})=>{

  const {image,brand,description,productId,name,quantity,totalPrice,_id,isCheck,buyerId}= cart;
  const [productInfo,setProductInfo] = useState();
  const [finalQuantity,setFinalQuantity]= useState(quantity);
  const [isUpdateCart,setIsUpdateCart] = useState(false);
  // const [isCheckBox,setIsCheckBox] = useState();

  // here hit api to get total quantity of product
  useEffect(()=>{
    const getInfo=async()=>{
      setProductInfo(await getSingleProduct(productId));
    }
    getInfo();
  },[isUpdateCart]);
  // update product list card product coll when user change qty
  const maxQuantity=quantity+productInfo?.quantity;
  useEffect(()=>{
   async function updateCart()
   {
     if(finalQuantity != quantity)
    {
        const updateInfo={
        productId:productId,
        cartId :_id,
        cartFinalQty:finalQuantity,
        productFinalQty:maxQuantity-finalQuantity,
       }
    try{const res = await axiosClient.put("/updateCart",updateInfo);
       console.log(res); 
      }
    catch(err)
    { console.log(err);
     } 
    }
  }
  updateCart();

  },[finalQuantity]);



  const deleteClickHandler =async(event)=>{
    event.preventDefault();
     try{
      const res= await axiosClient.delete(`deleteCart/${_id}/${productId}/${finalQuantity}`);
      if(res.status==200)
      {
        setIsDelete(prev=>prev+1);
         createNotification({  isSuccess:true,  description:res.data.message, placement:"topRight", duration:2 })
      }
      else{ createNotification({isSuccess:false, description:res.data.error, placement:"topRight",duration:2})
       }
     }
     catch(err)
     { console.log(err); }
   }
 
  const updateCheckBox=()=>{
    updateIsCheck(false,_id,buyerId,!isCheck,setIscheckUpdate);
   }
   
  return(
    <>
    <div className = {`${Style.cartItemContainer} ${Style.flexRow}`}>
      <input type = "checkbox" onChange={updateCheckBox} checked={isCheck} />
      <img src={`${import.meta.env.VITE_TEST_URL}${image}`}/>
      <p>
        <span className={Style1.mainPopertyStyle} >Name:{name}</span>
         <span className={`${Style.flexCol}`}>
          {description}
         </span>
         <span className={Style1.mainPopertyStyle} >
            Brand :{brand}
         </span>
      </p>
      {/* discound info wrapper */}
      <div className={`${Style.discountWrapper} ${Style.flexCol}`}>
           <span>Rs{totalPrice}</span>
           <s>1000</s>
           <span>10%</span>
           <i className="fa-solid fa-trash" onClick={deleteClickHandler}></i>
      </div>
      <div className={`${Style.buttonWrapper} ${Style.flexRow}`}>
           <button onClick={(event)=>{
            inDec(event,setFinalQuantity,maxQuantity)
            setIscheckUpdate(prev => prev+1);
             }} 
             data-value="+" >+</button>
           <span>{finalQuantity}</span>
           <button onClick={(event)=>{
            inDec(event,setFinalQuantity,maxQuantity)
            setIscheckUpdate(prev => prev+1);
             }} 
             data-value="-" 
           >-</button>
      </div>

    </div>
     
    </>
  )
}

const EmptyCart=()=>{
  const navigate = useNavigate();
  const continueBtnClick=()=>{
    navigate("/productList");

  }
  return(<div>
   <section className={Style.noCartWrapper}>
          <p>There are no item in the cart</p>
           <button  onClick={continueBtnClick}  >
            Continue Shooping
           </button>
    </section>
</div>)
}

const AddToCart=()=>{

  // here fetching data of the user
  const [isCheckAll,setIscheckAll]= useState(true);
  const [isDelete ,setIsDelete]= useState(0);
  const [cartInfo,setCartInfo] =  useState();
  const [isCheckUpdate,setIscheckUpdate] =useState(0);
   const allItemDelete=async(event)=>{
    event.preventDefault();
    try{
         const res= await axiosClient.delete(`/deleteAllCart/${cartInfo[0].buyerId}`);
         if(res.status==200)
         {
           setIsDelete(prev=>prev+1);
            createNotification({  isSuccess:true,  description:res.data.message, placement:"topRight", duration:2 })
         }
         else{
           createNotification({isSuccess:false, description:res.data.error, placement:"topRight",duration:2})
          }
      }
     catch(err)
     { console.log(err);}

   }
  useEffect( ()=>{
    const getData=async()=>{
       let count = 0;
    try{
        const getCart = await axiosClient.get(`getCart/${localStorage.getItem("id")}`) ;
          if(getCart.status == 200 )
          {
            setCartInfo(getCart.data.message);}
            getCart.data.message?.forEach((item)=>{
              
              if(item.isCheck == false)
              {
                // alert("enter");
                count = 1;
                setIscheckAll(false);
              }  
            })
            if(count == 0)
            {
               setIscheckAll(true);
            }
         }
        catch(err)
        {  setCartInfo(null); }
  }
  getData();
},[isDelete,isCheckUpdate]);


const checkAllHanlder=(event)=>{
  event.preventDefault();
  setIscheckAll(prev =>!prev);
  updateIsCheck(true,cartInfo[0]._id,cartInfo[0].buyerId,!isCheckAll,setIscheckUpdate);

}


  return(
  // here defining the cAomponent header 
  <>
 { cartInfo?.length>0?
    (<div className={`${Style.wholeCartWrapper} `}>   
      <div className={`${Style.cartWrapper} ${Style.flexCol}`}>

            <div className={`${Style.cartHeader} ${Style.flexRow}`}>
              <label forhtml="selectAll">
                  <input type="checkbox" id="selectAll"  onChange={checkAllHanlder}  checked={isCheckAll}/>&nbsp;&nbsp;check all 
              </label>
              <button onClick={allItemDelete}>
                  <i className="fa-solid fa-trash"></i> &nbsp;&nbsp;delete
              </button>
           </div>

            <div className={`${Style.cartItemWrapper} ${Style.flexCol}`}>
           
            {cartInfo?.map((cartData, index) => (
                <CartItem key={cartData.id || index} cart={cartData}  setIsDelete={setIsDelete} setIscheckUpdate={setIscheckUpdate}/>
                  ))}
           </div>

      </div>
      <div>
       <OrderSummary cartInfo={cartInfo}/>
      </div>
    </div>):
    // <PaymentDetail/>
    <EmptyCart/>
    }
    <Footer/>
    </> 

  )
}
export default AddToCart;