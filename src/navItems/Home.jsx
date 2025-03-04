import Style from './home.module.css';
import Product from '../product/product';
import Footer from '../footer/footer';
// here making the array for the image
import {useState,useEffect} from "react";
import logoImg from '../assets/logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong,faLocationDot,faAddressBook } from '@fortawesome/free-solid-svg-icons';
const CycleInfo=()=>
{  return(
        <>
        <div className={Style.cycleInfoWrapper}>
            <div>
            <h2 className={Style.infoTitle}>Cycle Information</h2>
            <div className={Style.itemWrapper}>
                <Item property={"brand"} value={"cannodale"}/>
                <Item property={"types"} value={"Hybrid bikes"}/>
                <Item property={"weight"} value={"10"}/>
                <Item property={"color"} value={"blue"}/>
                <Item property={"price"} value={"300"}/>
                <Item property={"warrenty"} value={"3year"}/>
            </div>    
            </div>
          <SellerInfo name={"bikalshrestha"} address="nepalgunj" contact="9805206658"/>
        </div>
        </>
     )
}
const SellerInfo=({name,address,contact})=>
{
    return(
     <div className={Style.sellerInfo}>
       <h2 className={Style.infoTitle}>Seller Information</h2>
        <div className={Style.addressContactInfo} >
            {/* secondo child */}
             <img src={logoImg}/>
             <span>Bikal shrestha</span>
        </div>
        <div className={Style.addressContactInfo}>
            <span>
            <FontAwesomeIcon icon={faLocationDot}/> 
            <a href="https://www.google.com/maps/place/Beni/@28.3467114,83.4993116,13z/data=!3m1!4b1!4m6!3m5!1s0x399607c3997bd40f:0x23b0b6b583d28ec8!8m2!3d28.3685354!4d83.5390002!16s%2Fm%2F03wckwf?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D">&nbsp;location</a>
           </span>
             <span>
            <FontAwesomeIcon icon={faAddressBook}/>&nbsp; contact 
             </span>
        </div>
     </div>
    )
}
const Item=({property,value})=>
{
   return(<div className={Style.itemContainer} >
        <span>{property}</span>
        <span>:</span>
        <span>{value}</span>
       </div>);

}
function Advertisement({image,brand,percentage})
{  // storing the iflash sale image in the  databasel
    return(
    <>
    <div className={Style.advertisementWrapper}>
    {/* style={{border:"3px solid blue"} */}
        <div className={Style.imgcrousel}>
         <img src={`/flashSale/${image}`} alt="Furry Presents" loading="lazy" />
         </div>  
         <CycleInfo/>
     </div>  
    </>)
};

const CompanyInfo = () => {
    return (
        <>
            <div className={Style.infoWrapper}>
                <div className ={Style.infoContainer1}>
                   <span className = {Style.kbs_bannerTitle}>Kinetic Bicycle Shop</span>
                   <p>Shop smarter, not harder - everything you need, all in one place!</p>
                </div>
                <div className = {`${Style.infoContainer1} ${Style.infoContainer2}`}>
                    {/* drive to the product list table  */}
                    <a href="http://localhost:5173/productList">
                        Explore our Premium Brand Prodcut
                    </a>
                  <FontAwesomeIcon icon={faArrowRightLong} style={{fontWeight:"bold",fontSize:"1rem",color:"white"}}/>  
                       
                </div>
                
            </div>
        </>
    );
}



const FlashSale=()=>
{
    return(
        <div className ={Style.flashSaleWrapper} >
          <Product/>   
          <Product/>   
          <Product/>   
          <Product/>   
          <Product/>   
          <Product/>   
        </div>
    )

}

function Home()
{
    // coursel image count
    const [imgCount,setImgCount] = useState(0);
    // here declaring the require array
    const image = ["blue.jpg","green.jpg","red.jpg","smooth.jpg"];
    const brand = ["Mercery","zigzag","kkkk","jjjjj"];
    const percentage = [10,30,10,50];
     useEffect(()=>{
        const interval = setInterval(()=>{
            setImgCount((prevCount)=>
                {  if(prevCount == percentage.length-1)
                    { return 0;}
                return prevCount+1
             });
        },4000);
        return ()=>clearInterval(interval);
    },[]);
    return(
        <>
        <div className = {Style.container}>
        <CompanyInfo/>
        {/* <div className={Style.container}>this home page</div> */}
        <Advertisement image={image[imgCount]} brand ={brand[imgCount]} percentage={percentage[imgCount]}/>
        <section className = {Style.saleWrapper}>
        <h2 className={Style.saleTitle}>Flash Sale</h2>
        <FlashSale/>
        </section>

        <section className = {Style.saleWrapper}>
        <h2 className={Style.saleTitle}>Categories</h2>
        <FlashSale/>
        </section>

        <section className = {Style.saleWrapper}>
        <h2 className={Style.saleTitle}>Just For You</h2>
        <FlashSale/>
        </section>
        </div>
        <Footer/>
        </>

    )   
}
export default Home;