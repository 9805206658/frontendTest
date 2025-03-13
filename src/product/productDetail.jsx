import Style from "./productDetail.module.css";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from '../api/axiosClient';
import Footer from '../footer/footer';

const url = import.meta.env.VITE_TEST_URL;
const ImageDisplayer=({images})=>{
    // console.log(images);
    const [imageState,setImageState] = useState();
    return(
    <div className={Style.imageWrapper}>
            <div className = {Style.imageContainer}>
               {images&&<img src={`${url}${images[0]}`}/>}
               </div>
          <div className={Style.imageBtnWrapper}>
            {
              images?.map((image,index)=>{
                return(<div ><img key={index} src={`${url}${image}`}/></div>)
            })
        
            }
            <button>

            </button>
          </div>
          
        </div>)

}


const Discription =({product})=>
{
    console.log(product);
    let start = 3;
   const {name,brand,color,description,frameMaterial,price,quantity,warrentyPeriod,weight}=product;
    return(
        <>
         <div className={Style.descriptionWrapper}>
             <h1>{name?name:"KBS Cycle"}</h1>
          <div className={Style.rating} >
            <span>rating</span>
           <i className="fa-solid fa-star"></i>
           <i  className="fa-solid fa-star"></i>
           <i className="fa-solid fa-star"></i>
          </div>
          <div className={Style.discount}>
            <span>Rs 9000</span> 
             <s>Rs 12000 -25% </s>
          </div>
          <div>
            color :{color}
          </div>
          <div className={Style.quantity}>
             <span>quantity &nbsp;</span>
             <button>+</button>
             <div>13</div>
             <button>-</button>

          </div>
          <div className={Style.buySellContainer}>
            <button> Buy Now </button>
            <button> Add To Cart </button>
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
                <i class="fa-regular fa-hand-lizard"></i>
                   <p className={`${Style.flexCol}`} >
                    <span class={` ${Style.linkStyle}`} >100% Authentic from Trusted Brand</span>
                  
                     <span>or Get 2x Your Money Back	</span> 
                   </p>
             </div>

             <div className={`${Style.additionalItem} ${Style.flexRow}`}>
                <i class="fa-regular fa-hand-lizard"></i>
                   <div className={`${Style.flexCol} `}>
                     <span   class={` ${Style.linkStyle}`} > 14 days free & easy return</span>
                      <span>Change of mind is not applicable</span>	
                   </div>
             </div> 
              <div className={`${Style.additionalItem} ${Style.flexRow}`}>
                <i class="fa-regular fa-hand-lizard"></i>
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
    const productId = location.state.id;
    const [productInfo,setProductInfo] = useState();
    useEffect(()=>{
        // get product detail from server
        const getSingleProduct=async()=>{
            try{
                const res = await axiosClient(`getSingleProduct/${productId}`);
                console.log(res);
                setProductInfo(res.data.message);
            }
            catch(err)
            { console.log(err);}
         }
         getSingleProduct();
    },[]);
   
    return (
    <div className={Style.detailPage} >
     <div className={Style.wholeDetailWrapper}>
        <ImageDisplayer images={productInfo?.imageName}/>
         <Discription product={productInfo !=null && productInfo}/>
         <DeliverInformation/>      
    </div>
    <Footer/>
    </div>
    );


}
export default ProductDetail;

