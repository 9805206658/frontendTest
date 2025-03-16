import Style from "./productDetail.module.css";
import { useState,useEffect,useRef } from "react";
import { useLocation, } from "react-router-dom";
import axiosClient from '../api/axiosClient';
import Footer from '../footer/footer';
import createNotification from "../notification/notification";
import { getSingleProduct } from "../api/productService";
const url = import.meta.env.VITE_TEST_URL;
import { inDec } from "../api/productService";
const ImageDisplayer=({images,initialImg})=>{
  // console.log(images.length);
  console.log(initialImg);
  const [imageState,setImageState] = useState(initialImg);
  const imageClick=(event)=>{
    console.log(event.currentTarget.getAttribute("data-url"));
     setImageState(event.currentTarget.getAttribute("data-url"))
  }

    return(
    <div className={Style.imageWrapper}>
            <div className = {Style.imageContainer}>
               {images&&<img src={`${url}${imageState}`}/>}
               </div>
          <div className={Style.imageBtnWrapper}>
            {  images?.map((image,index)=>{
                return(<div onClick={imageClick} data-url={image} key={index} ><img src={`${url}${image}`}/></div>)
             })
           }
          </div>
          
        </div>)

}


const Discription =({product,initialImg,setIsAddCard})=>
{
   const [countQuantity ,setCountQuantity]= useState(1);
 
   const {name,brand,color,description,frameMaterial,price,quantity,warrentyPeriod,weight,_id,images,status}=product;
  
 
   const addToCartHandler=async(event)=>{
    try{
    if(status == 'inactive')
    {  
      setIsAddCard(prev=>!prev);
              createNotification({
                isSuccess:true,
                description:"product is reserved",
                placement:"topRight",
                duration:2
               })
      return ;
    }
    console.log("the count quantity is"+countQuantity);
      event.preventDefault();
       const bId = localStorage.getItem('id');
      const cart={
        name:name?name:"KBS Cycle",
        buyerId:bId,
        productId:_id,
        description:description,
        quantity:countQuantity,
        price:price,
        brand:brand,
        totalPrice:0,
        finalQuantity:(quantity-countQuantity),
        image:initialImg
      }
      
          const res= await axiosClient.post('createCart',cart);
          
         
            if(res.status == 200)
             { 
              setIsAddCard(prev=>!prev);
              setCountQuantity(1);
              createNotification({
                isSuccess:true,
                description:res.data.message,
                placement:"topRight",
                duration:3
               })
               
            }
      }
      catch(err)
      {
        console.log(err);
        
          // console.error("Error:", res); // Debugging log
          createNotification({
            isSuccess: false,
            description: err.data?.error || "An unexpected error occurred",
            placement: "topRight",
            duration: 2,
          });
        
       
      }
   }
    return(
        <>
         <div className={Style.descriptionWrapper}>
             <h1>{name?name:"KBS Cycle"}</h1>
          <div className={Style.rating} >
            <span>{description}</span>
           {/* <i className="fa-solid fa-star"></i>
           <i  className="fa-solid fa-star"></i>
           <i className="fa-solid fa-star"></i> */}
          </div>
          <div className={Style.discount}>
            <span>{price}</span> 
             <s>Rs 12000 -25% </s>
             <span>color: &nbsp;{color}</span>
          </div>
          <div className={Style.additionalInfo}>
            {/* <span>color :{color} &nbsp; &nbsp;</span> */}
            <span>Frame Material:&nbsp;{frameMaterial}</span>
            <span>brand :&nbsp;{brand}</span>
            <span>Weight: &nbsp;{weight}</span>
            
          </div>
          <div className={Style.quantity}>
             <span>quantity &nbsp;</span>
             <button onClick={(event)=>{
              inDec(event,setCountQuantity,quantity);

             }} data-value="+">+</button>
             <span id="quantity">{countQuantity}</span>
             <button  onClick={(event)=>{
              inDec(event,setCountQuantity,quantity);

             }}>-</button>

          </div>
          <div className={Style.buySellContainer}>
            <button > Buy Now </button>
            <button onClick={addToCartHandler}> Add To Cart </button>
          </div>
          </div>
        </>
    )
}

const DeliverInformation=()=>{
   return(
      <div className={`${Style.deliverWrapper} ${Style.flexCol}`}>
            <div>
            <p className={`${Style.additionalTitleColor}`}> Delivery option</p>
            <div className={`${Style.additionalItem} ${Style.flexRow}`} >
              <div>
               <i className="fa-solid fa-location-dot" ></i>
              </div>
               <p className={Style.flexCol}><span>Bagmati, Kathmandu Metro 22 </span> <span>Newroad Area, Newroad </span>	</p>
               <a href="#change" className= {`${Style.linkStyle}`}>change</a>
            </div>

            <div  className={`${Style.additionalItem} ${Style.flexRow}`}  >
                <i className="fa-regular fa-hand-lizard"></i>
                   <p  className={`${Style.flexCol}`} >
                    <span><b>Standard Delivery 19</b> Jun - 20 Jun</span> 
                    <span>2 - 3 day(s) </span>
                    </p>
                   <p> Rs 70</p>
             </div>

             <div  className={`${Style.additionalItem} ${Style.flexRow}`} >
                <i className="fa-solid fa-location-dot" ></i>
                   <p>Cash on deliver available</p>
             </div>   
             </div>

             <div >
            <p  className={`${Style.additionalTitleColor}`}>Service</p>
            <div className={`${Style.additionalItem} ${Style.flexRow}`} >
                <i className="fa-regular fa-hand-lizard"></i>
                   <p className={`${Style.flexCol}`} >
                    <span className={` ${Style.linkStyle}`} >100% Authentic from Trusted Brand</span>
                  
                     <span>or Get 2x Your Money Back	</span> 
                   </p>
             </div>

             <div className={`${Style.additionalItem} ${Style.flexRow}`}>
                <i className="fa-regular fa-hand-lizard"></i>
                   <div className={`${Style.flexCol} `}>
                     <span   className={` ${Style.linkStyle}`} > 14 days free & easy return</span>
                      <span>Change of mind is not applicable</span>	
                   </div>
             </div> 
              <div className={`${Style.additionalItem} ${Style.flexRow}`}>
                <i className="fa-regular fa-hand-lizard"></i>
                   <p> Warranty not available</p>
             </div>

         </div>




      <div>
            <p  className={`${Style.additionalTitleColor}`}>Sold by</p>
            <div  className={`${Style.additionalItem} ${Style.flexRow} ${Style.flexJustify}`}>
                <p>Avi Trade Link </p>
                <i className="fa-regular fa-comment"></i>
              
            </div>

            <div className={`${Style.sellerInfo} ${Style.flexRow}`}>
                  <div>
                      <p className = {`${Style.additionalTitleColor}`}> postive Seller Rating</p>
                      <h3 className={`${Style.ratio}`}>98%</h3>
                  </div>
                  <div>
                      <p  className = {`${Style.additionalTitleColor}`}> ship on timme</p>
                      <h3  className={`${Style.ratio}`}>98%</h3>
                  </div>
                  <div  >
                      <p className = {`${Style.additionalTitleColor}`}> Chat Response Rate</p>
                      <h3 className={`${Style.ratio}`}>100%</h3>
                  </div>
            </div>

            <div className={`${Style.additionalItem} ${Style.flexRow}`}>
                <p className={`${Style.vistStore} ${Style.linkStyle}`} ><a href="#visit store">visit store</a></p>
            </div>

        </div>
       
    </div>

    );

}


const ProductDetail =()=>
{
    const location = useLocation();
    const [isAddCard,setIsAddCard] = useState(false);
    const {productId,initialImg} = location.state;
    console.log(initialImg);
    const [productInfo,setProductInfo] = useState();
    
     
   
    useEffect(()=>{
        const getInfo=async()=>{
          setProductInfo(await getSingleProduct(productId));
        }
        getInfo();
    },[isAddCard]);
    return (
    <div className={Style.detailPage} >
     <div className={Style.wholeDetailWrapper} >
      
        <ImageDisplayer images={productInfo?.imageName} initialImg={initialImg}/>
         <Discription product={productInfo !=null && productInfo}  initialImg={initialImg} setIsAddCard={setIsAddCard} />
         <DeliverInformation/>      
    </div>
    <Footer/>
    </div>
    );


}
export default ProductDetail;

