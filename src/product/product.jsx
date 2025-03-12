
import cycle from '../assets/blue.jpg';
import Style from '../product/product.module.css';
const Product=({image,description,price,rating,discount})=>
{
  const start =[];
  for(let i= 0; i<rating; i++)
  {
    start.push( <i key={i} className="fa-solid fa-star"></i>);
  }

 return(
    <div className = {Style.productWrapper}>
        <img src={image}/>
      <div className = {Style.productContainer}>
          <p className={Style.description}>
            {description}
          </p>
       <p className={Style.price}>price rs {price}</p>
       <p className={Style.price}>
        {start}
       </p>
        {discount &&<p>discount 50%</p>}
     </div>
    </div>
 )
}
export default Product;