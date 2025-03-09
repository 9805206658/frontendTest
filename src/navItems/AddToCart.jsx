import Style from "../navItems/AddToCart.module.css"
import cycle from "../assets/blue1.jpg";
import Footer from "../footer/footer";
const OrderSummary=()=>
{
  return(
    <>
    <div className={`${Style.orderSummaryWrapper} ${Style.flexCol}`}>  
      <h2>Order Summary</h2> 
          <div className={`${Style.flexRow}`}>
             <span>Subtotal(2item)</span>
             <span>0</span>
          </div>
          <div className={`${Style.flexRow}`}>
             <span>shipping Fee</span>
             <span>175</span>
          </div>
          <div className={`${Style.flexRow}`}>
            <input type="Number" placeholder="Enter voucher code"/>
            <button className={Style.btn}>Apply</button> 
          </div>
          <div className={`${Style.flexRow}`}>
             <span>Total</span>
             <span>1000</span>
          </div>
          <button className={`${Style.btn}`}>
            procedure to checkout
          </button>
    </div>
  </>

  )
}

const CartItem=()=>{
  return(
    <>
    <div className = {`${Style.cartItemContainer} ${Style.flexRow}`}>
      <input type = "checkbox"/>
      <img src={cycle}/>
      <p>
         <span className={`${Style.flexCol}`}>
             Cycle with electronic gear rs 3000 and titanium
         </span>
         <span>
            Brand :cannodle
         </span>
      </p>
      {/* discound info wrapper */}
      <div className={`${Style.discountWrapper} ${Style.flexCol}`}>
           <span>Rs 3000</span>
           <s>1000</s>
           <span>10%</span>
           <i className="fa-solid fa-trash"></i>
      </div>
      <div className={`${Style.buttonWrapper} ${Style.flexRow}`}>
           <button>+</button>
           <span>1</span>
           <button>-</button>
      </div>

    </div>
     
    </>
  )
}

const AddToCart=()=>{
  return(
  // here defining the component header 
  <>
    <div className={`${Style.wholeCartWrapper} `}>   
      <div className={`${Style.cartWrapper} ${Style.flexCol}`}>

            <div className={`${Style.cartHeader} ${Style.flexRow}`}>
              <label forhtml="selectAll">
                  <input type="checkbox" id="selectAll"/>&nbsp;&nbsp;check all 
              </label>
              <button>
                  <i className="fa-solid fa-trash"></i> &nbsp;&nbsp;delete
              </button>
           </div>

            <div className={`${Style.cartItemWrapper} ${Style.flexCol}`}>
              <CartItem/>
              <CartItem/>
              <CartItem/>
           </div>

      </div>
      <div>
       <OrderSummary/>
      </div>
    </div>
    <Footer/>
    </> 

  )
}
export default AddToCart;