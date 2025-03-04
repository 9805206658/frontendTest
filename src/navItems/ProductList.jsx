import Style from '../navItems/productList.module.css';
import Product from '../product/product';
import Footer from '../footer/footer';
const SortItem=({name})=>
{   return(
       <>
          <button className={Style.sortBtn}>
             {name}
          </button>
       </>
      )
}
function  ProductList()
{
    return(
        <>
        {/* width 70vw */}
        {/* <h2>hellow world</h2> */}
        <div className={Style.productListWrapper}>
          <div className={Style.wholeSortWrapper}>
                <div className ={Style.sortWrapper}>
                      <h2 className={Style.saleTitle}>Brand</h2>
                      <div className={Style.sortCotainer}>
                     {/* sort ting info */}
                           <SortItem name="bikal" />
                           <SortItem name="sarmila"/>
                           <SortItem name="doctor"/>
                           <SortItem name="aaaa"/>
                           <SortItem name="ekekekkeeke"/>
                           <SortItem name="ekekekkeeke"/>
        
                       </div>
             </div>

           <div className ={Style.sortWrapper}>
                <h2 className={Style.saleTitle}>price</h2>
                 <div className={Style.sortCotainer}>
                  {/* sort ting info */}
                    <SortItem name="bikal" />
                    <SortItem name="sarmila"/>
                    <SortItem name="doctor"/>
                    <SortItem name="aaaa"/>
                    <SortItem name="ekekekkeeke"/>
                    <SortItem name="ekekekkeeke"/>
                   </div>
             </div>
             <div className ={Style.sortWrapper}>
                  <h2 className={Style.saleTitle} > color </h2>
                  <div className={Style.sortCotainer}>
                  {/* sort ting info */}
                      <SortItem name="green" />
                      <SortItem name="red"/>
                      <SortItem name="blue"/>
                      <SortItem name="orange"/>
                      <SortItem name="yellow"/>
                      <SortItem name="black green"/>
                   </div>
              </div>
          </div>
              
              <div className = {Style.productWrapper}>
                  <Product/>
                  <Product/>
                  <Product/>
                  <Product/>
                  <Product/>
                  <Product/>
                  <Product/>
              </div>  
            
        </div>
        <Footer/> 
        </>
    )
}
export default ProductList;