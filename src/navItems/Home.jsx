import Style from './home.module.css';
import Product from '../product/product';
import Footer from '../footer/footer';
// here making the array for the image
import {useState,useEffect,useSelector} from "react";
import logoImg from '../assets/logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong,faLocationDot,faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
const CycleInfo=()=>
{    
    return(
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
const SellerInfo=({name,address,contact})=>
{
    return(
     <div className={Style.sellerInfo}>
       <h2 className={Style.infoTitle}>Seller Information</h2>
        <div className={Style.addressContactInfo} >
            {/* secondo child */}
             <img src={logoImg}/>
             <span>Ram shrestha</span>
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


const CompanyInfo = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={Style.infoWrapper}>
                <div className ={Style.infoContainer1}>
                   <span className = {Style.kbs_bannerTitle}>Kinetic Bicycle Shop</span>
                   <p>Shop smarter, not harder - everything you need, all in one place!</p>
                </div>
                <div className = {`${Style.infoContainer1} ${Style.infoContainer2}`}>
                    {/* drive to the product list table  */}
                    <a onClick={()=>{
                        navigate('/productList');
                    }}>
                        Explore our Premium Brand Prodcut
                    </a>
                  <FontAwesomeIcon icon={faArrowRightLong} style={{fontWeight:"bold",fontSize:"1rem",color:"white"}}/>  
                       
                </div>
                
            </div>
        </>
    );
}



const FlashSale=({flashSale})=>
{
    // getting the data flash sale
  
    // console.log(flashSale);
    return(
        <div className ={Style.flashSaleWrapper} >
          {
             flashSale?.map((obj) => (
                <Product id={obj._id}  key={obj._id} image={`${obj.imageName[0]}`} description={obj.description} price={obj.price} rating={3}  name={obj.name} discount={obj.discount}/>
              ))
          }
        </div>
    )

}

function Home()
{
    const [imgCount,setImgCount] = useState(0);
    // here declaring the require array
    const image = ["blue.jpg","green.jpg","red.jpg","smooth.jpg"];
    const brand = ["Mercery","zigzag","kkkk","jjjjj"];
    const percentage = [10,30,10,50];

    const [flashSale,setFlashSale] = useState();
    const [uniqueBrand,setUniqueBrand] = useState();
    const [allProduct, setAllProduct] = useState();
    useEffect(()=>{
        const uniqueBrand=async()=>{
            try{
                const res = await axiosClient.get('/getUniqueBrand');
                if(res.status == 200)
                { setUniqueBrand(res.data.message);}
            } 
            catch(err)
             {console.log(err);
            
              }
          }
          const allProduct=async()=>{
            try{
                const res = await axiosClient.get('/getProducts');
                if(res.status == 200)
                { setAllProduct(res.data.message);}
            } 
            catch(err)
             {console.log(err);
            
              }
          }
         allProduct()
        uniqueBrand();
    },[])
    // console.log(uniqueBrand);


    useEffect(()=>
    {
     const getFlashSaleData=async()=>{
       const res = await axiosClient.get('/getFlashSale');
       console.log(res.data.message);
       if(res.status == 200)
       {
         setFlashSale(res.data.message);
       }
     }
     getFlashSaleData();

    },[]);


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

    // flash sale data api 
    // category data api
    return(
        <>
        <div className = {Style.container}>
        <CompanyInfo/>
        {/* <div className={Style.container}>this home page</div> */}
        <Advertisement image={image[imgCount]} brand ={brand[imgCount]} percentage={percentage[imgCount]}/>
        <section className = {Style.saleWrapper}>
        <h2 className={Style.saleTitle}>Flash Sale</h2>
        <FlashSale flashSale={flashSale}/>
        </section>
        <section className = {Style.saleWrapper}>
            {/* show available brand product */}
        <h2 className={Style.saleTitle}>Categories</h2>
        <FlashSale flashSale={uniqueBrand}/>
        </section>
        <section className = {Style.saleWrapper}>
        <h2 className={Style.saleTitle}>Just For You</h2>
        <FlashSale flashSale={allProduct} />
        </section>
        </div>
        <Footer/>
        </>

    )   
}
export default Home;




