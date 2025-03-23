 import AddItems from "./addItems";
 import { useState } from "react";
 import SellerProductList from "./sellerProductList";
 import Style from "./sellerMenu.module.css";
 const SellerMenu=()=>{
     
    const [isAddItem,setIsAddItem] = useState(true);
    const menuClickHandler=(event)=>{
        if(event.target.getAttribute('data-value') == "add" )
        {setIsAddItem(true); }
        else 
        { setIsAddItem(false)}
    }
    // const [isViewAll,setIsViewAll] = useState();
    return(
        <>
        <div>
            <ul className={Style.sellerMenuWrapper}>
                <li data-value="add"onClick={menuClickHandler}>Add Items</li>
                <li data-value="view" onClick={menuClickHandler}>View All Product</li>
            </ul>
            <div >
                {/* here display all page */}
            {isAddItem?<AddItems/>:<SellerProductList menuClickHandler={menuClickHandler}/>}

                
            </div>
        </div>
        
        </>
    )
}
export default SellerMenu;