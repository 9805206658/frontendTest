
import { useNavigate } from 'react-router-dom';
import cycle from '../assets/blue.jpg';
import Style from '../product/product.module.css';
const Product=({image,description,price,rating,discount,id,name})=>
{
  console.log(discount);
  const navigate = useNavigate();

  const productClick=(event)=>{
    const ele= event.currentTarget;
    console.log(ele.getAttribute("data-value"));
    navigate('/productDetail',{state:{productId:id,initialImg:image}});  
  }
  const start =[];
  for(let i= 0; i<rating; i++)
  {
    start.push( <i key={i} className="fa-solid fa-star"></i>);
  }

 return(
    <div className = {Style.productWrapper} onClick={productClick} data-value={id}>
        <img src={`${import.meta.env.VITE_TEST_URL}${image}`}/>
      <div className = {Style.productContainer}>
        <h2 className={`${Style.mainPopertyStyle}` } >{name?name:"KBS Cycle"}</h2>
          <p className={Style.description}>
            {description}
          </p>
       <p className={`${Style.price} ${Style.mainPopertyStyle}`}>price rs {price}</p>
       <p className={Style.price}>

         { 
          discount>0 && (<p className = {`${Style.mainPopertyStyle}` } >{discount}%</p>)
         
         }
        {/* here displaying thie start */}
        {start}
       </p>
       
     </div>
    </div>
 )
}
export default Product;