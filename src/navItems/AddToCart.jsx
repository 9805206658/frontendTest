import Style from "../navItems/AddToCart.module.css"
import Footer from "../footer/footer";
import PaymentDetail from "../payment/payment";
import axiosClient from "../api/axiosClient";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import createNotification from "../notification/notification";
import { inDec } from "../api/productService";
import { getSingleProduct } from "../api/productService";
import axios from "axios";
const OrderSummary=({cartInfo})=>
{
  let subTotal = 0;
  let total=0;
   for(let i= 0; i < cartInfo.length; i++)
   { subTotal += cartInfo[i].totalPrice;}
   total = subTotal+175;
  const navigate = useNavigate();
  const ptcHandler=()=>{
    const paymentDetail={
       subTotal:subTotal,
       total:total,
       charge:"175"
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

const CartItem=({cart,setIsDelete})=>{

  const {image,brand,description,productId,name,quantity,totalPrice,_id}= cart;
  const [productInfo,setProductInfo] = useState();
  const [finalQuantity,setFinalQuantity]= useState(quantity);
  
  const [isUpdateCart,setIsUpdateCart] = useState(false);

  // here hit api to get total quantity of product
  useEffect(()=>{
    const getInfo=async()=>{
      setProductInfo(await getSingleProduct(productId));
    }
    getInfo();
  },[isUpdateCart]);
  // update product list card product coll when user change qty
  const maxQuantity=quantity+productInfo?.quantity;
  console.log("the quantity infomation");
  console.log("maxQuantity"+maxQuantity);
  console.log("finalQuantity"+finalQuantity);
  console.log("finalQuantity"+maxQuantity-finalQuantity);
  useEffect(()=>{
   async function updateCart()
   {
   const updateInfo={
        productId:productId,
        cartId :_id,
        cartFinalQty:finalQuantity,
        productFinalQty:maxQuantity-finalQuantity,
       }
    try{const res = await axiosClient.put("/updateCart",updateInfo);
       console.log(res); }
    catch(err)
    { console.log(err);  }
  }
  updateCart();

  },[finalQuantity]);

  const deleteClickHandler =async(event)=>{
  alert("click");
    event.preventDefault();
     try{
      const res= await axiosClient.delete(`deleteCart/${_id}/${productId}/${quantity}`);
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
     { console.log(err); }
   }
  
  return(
    <>
    <div className = {`${Style.cartItemContainer} ${Style.flexRow}`}>
      <input type = "checkbox"/>
      <img src={`${import.meta.env.VITE_TEST_URL}${image}`}/>
      <p>
        <span>Name:{name}</span>
         <span className={`${Style.flexCol}`}>
          {description}
         </span>
         <span>
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
             }} 
             data-value="+" >+</button>
           <span>{finalQuantity}</span>
           <button onClick={(event)=>{
            inDec(event,setFinalQuantity,maxQuantity)
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
  const [isDelete ,setIsDelete]= useState(0);
  const [cartInfo,setCartInfo] =  useState();
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
     {
      console.log(err);
     }

   }
  useEffect( ()=>{
    const getData=async()=>{

      // console.log("deleteState"+isDelete);
    try{
        const getCart = await axiosClient.get(`getCart/${localStorage.getItem("id")}`) ;
        console.log(getCart);
          if(getCart.status == 200)
          {setCartInfo(getCart.data.message);} }
        catch(err)
        { console.log(err);}
  }
  getData();
},[isDelete]);
console.log(cartInfo);
// console.log(cartInfo.length);
  return(
  // here defining the component header 
  <>
 { cartInfo?.length>=1?
    (<div className={`${Style.wholeCartWrapper} `}>   
      <div className={`${Style.cartWrapper} ${Style.flexCol}`}>

            <div className={`${Style.cartHeader} ${Style.flexRow}`}>
              <label forhtml="selectAll">
                  <input type="checkbox" id="selectAll"/>&nbsp;&nbsp;check all 
              </label>
              <button onClick={allItemDelete}>
                  <i className="fa-solid fa-trash"></i> &nbsp;&nbsp;delete
              </button>
           </div>

            <div className={`${Style.cartItemWrapper} ${Style.flexCol}`}>
           
            {cartInfo?.map((cartData, index) => (
                <CartItem key={cartData.id || index} cart={cartData}  setIsDelete={setIsDelete}/>
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