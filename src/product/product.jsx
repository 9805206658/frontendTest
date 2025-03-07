
import cycle from '../assets/blue.jpg';
import Style from '../product/product.module.css';
const Product=()=>
{
 return(
    <div className = {Style.productWrapper}>
        <img src={cycle}/>
      <div className = {Style.productContainer}>
          <p className={Style.description}>
            vitamin c Brightering Anti aging Facing Serum
          </p>
       <p className={Style.price}>price rs :399</p>
       <p className={Style.price}>rating</p>
       <p>discount 50%</p>
     </div>
    </div>
 )
}
export default Product;