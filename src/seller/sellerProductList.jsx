// import Style from "../navItems/AddToCart.module.css"
import Footer from "../footer/footer";
import axiosClient from "../api/axiosClient";
import { useEffect ,useState} from "react";
import createNotification from "../notification/notification";
import Style from './sellerProductList.module.css';


const CartItem=({product,setIsDelete})=>{
   
  const {imageName,brand,description,name,price,_id,isFlashSale}= product;
  const [isFlash,setIsFlash] = useState(isFlashSale);
  console.log(isFlashSale);

  const flashSaleHandler=(event)=>{
    event.preventDefault();
    // console.log(event.currentTarget.getAttribute('data-value'));
    setIsFlash(prev=>!prev);
   
  }

  useEffect(()=>{
   const flashSaleUpdate=async()=>{ 
          if(isFlash != isFlashSale)
            {
              try{
              const res = await axiosClient.put(`flashSaleUpdate/${_id}/${isFlash}`);
              console.log(res);
               if(res.status==200)
               { setIsDelete(prev=>prev+1); }
              }
              catch(err)
              {
                console.log(err);
              }
            }
  }
  flashSaleUpdate();
  },[isFlash])

  const deleteClickHandler =async(event)=>{
    try{
       alert("click");
      
      const res= await axiosClient.delete(`deleteProduct/${_id}`);
      console.log(res);
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
      <img src={`${import.meta.env.VITE_TEST_URL}${imageName[0]}`}/>
      <p>
        <span>Name:{name?name:"KBS CYCLE"}</span>
         <span className={`${Style.flexCol}`}>
          {description}
         </span>
         <span>
            Brand :{brand}
         </span>
      </p>
      {/* discound info wrapper */}
      <div className={`${Style.discountWrapper} ${Style.flexCol}`}>
           <span>Rs{price}</span>
           <s>1000</s>
           <span>10%</span>
           <i className="fa-solid fa-trash" onClick={deleteClickHandler}></i>
      </div>
      <div className={`${Style.buttonWrapper} ${Style.flexCol}`}>
        <label className={`${Style.switch}`}>
          <input type="checkbox" onChange={flashSaleHandler}/>
          <span className={ isFlash?`${Style.slider} ${Style.trasformPosX}`:`${Style.slider} ${Style.trasformNegX}`}>{isFlash?'on':'off'}</span>
        </label>

        <p>flash sale</p>
      </div>

    </div>
     
    </>
  )
}

const EmptyCart=({menuClickHandler})=>{
  return(<div>
   <section className={Style.noCartWrapper}>
          <p>There are not your procut in Database</p>
           <button  onClick={menuClickHandler}  >
            Continue Add Product
           </button>
    </section>
</div>)
}

const SellerProductList=({menuClickHandler})=>{

  // here fetching data of the user
  const [isDelete ,setIsDelete]= useState(0);
  const [productInfo,setProductInfo] =  useState();
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
    try{
        const getProduct = await axiosClient.get(`getSellerProduct/${localStorage.getItem("id")}`) ;
        console.log(getProduct)
          if(getProduct.status == 200 )
          {setProductInfo(getProduct.data.message);} }
        
        catch(err)
        { setProductInfo(null);
        }
  }
  getData();
},[isDelete]);

  return(
  <>
 { productInfo?.length>0?
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
           
            {productInfo?.map((productData, index) => (
                <CartItem key={productData.id || index} product={productData}  setIsDelete={setIsDelete}/>
                  ))}
           </div>

      </div>
      <div>
       {/* <OrderSummary cartInfo={cartInfo}/> */}
      </div>
    </div>):
    // <PaymentDetail/>
    <EmptyCart menuClickHandler={menuClickHandler}/>
    }
    <Footer/>
    </> 

  )
}
export default SellerProductList;