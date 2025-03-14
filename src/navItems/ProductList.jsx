import Style from '../navItems/productList.module.css';
import Product from '../product/product';
import Footer from '../footer/footer';
import { useEffect ,useState} from 'react';
import axiosClient from '../api/axiosClient';
const url =  import.meta.env.VITE_TEST_URL;

// 'https://backendtest-ddis.onrender.com/'; 

const SortItem=({name,sortBtnClick,dataValue})=>
{   return(
       <>
          <button className={Style.sortBtn} onClick={sortBtnClick} data-value={dataValue}>
             {name}
          </button>
       </>
      )
}


function  ProductList()
{
  console.log(import.meta.env);
  console.log(url);
  const [products,setProducts]=useState([]);
  const [brands,setBrands] = useState({isBrand:false, items:null});//is brands = true,brands 
  const [colors,setColors] = useState({isColor:false ,items:null});
  const [prices,setPrices] = useState({isPrice:false,items:null});
  const [isAllproduct,setIsAllProduct] = useState(true);
  useEffect(()=>{
    const  readProduct=async()=>{
      try{
       const res= await axiosClient.get("getProducts")
       if(res.status == 200)
       { setProducts(res.data.message);
       }
        }
       catch(err)
       { console.log(err);}
    }
   readProduct();
  },[]);

  // get data form server
  const sortBtnClick = (event) => {
    event.preventDefault();
    let ele = event.currentTarget;
    let obj = JSON.parse(ele.getAttribute('data-value'));
    const temp = products.filter((ele) => ele[obj.key] === obj.value);
    switch (obj.key) {
      case "brand":
        setColors({ isColor: false, items: null });
        setPrices({ isPrice: false, items: null });
        setBrands({ isBrand: true, items: temp });
        setIsAllProduct(false);
        break;

        case "price":
          setColors({ isColor: false, items: null });
          setPrices({ isPrice: true, items: temp });
          setBrands({ isBrand: false, items: null });
          setIsAllProduct(false);
          break;
  

      case "color":
        setColors({ isColor: true, items: temp });
        setPrices({ isPrice: false, items: null });
        setBrands({ isBrand: false, items: null });
        setIsAllProduct(false);
        break;

      default:
        break;
    }
  };


   function  propertySelector(sortProperty)
   {
    const temp =[];
    products.forEach((ele)=>{
      if(!temp.includes(ele[sortProperty]))
      {temp.push(ele[sortProperty]);}
      });
      return temp;
   }
   const brand = propertySelector("brand");
   const price = propertySelector("price");
   const color = propertySelector("color");

   

const renderProducts = (items) =>
  items?.map((obj) => (
    <Product id={obj._id}  key={obj._id} image={`${obj.imageName[0]}`} description={obj.description} price={obj.price} rating={3} />
  ));
 const reset=()=>{
  setColors({ isColor: false, items: null });
  setPrices({ isPrice: false, items: null });
  setBrands({ isBrand: false, items: null });
  setIsAllProduct(true);

 }
  

    return(
        <>
        <div className={Style.productListWrapper} onDoubleClick={reset}>
          <div className={Style.wholeSortWrapper}>
                <div className ={Style.sortWrapper}>
                      <h2 className={Style.saleTitle}>Brand</h2>
                      <div className={Style.sortCotainer}>
                      
                      {
                        brand.map((ele,index)=>{
                          return <SortItem   key={index} name={ele} dataValue={JSON.stringify({key:"brand",value:ele})} sortBtnClick = {sortBtnClick}/>
                        })
                      }
               </div>
             </div>

           <div className ={Style.sortWrapper}>
                <h2 className={Style.saleTitle}>price</h2>
                 <div className={Style.sortCotainer}>

                        {
                           price.map((ele,index)=>{
                          return <SortItem  key={index} name={ele} dataValue={JSON.stringify({key:"price",value:ele} )}  sortBtnClick = {sortBtnClick}/>
                        })
                       }

                   </div>
             </div>
             <div className ={Style.sortWrapper}>
                  <h2 className={Style.saleTitle} > color </h2>
                  <div className={Style.sortCotainer}>
                       {  color.map((ele,index)=>{
                          return <SortItem   key={index} name={ele} dataValue={JSON.stringify({key:"color",value:ele})}  sortBtnClick = {sortBtnClick}/>
                        })
                       }

                   </div>
              </div>
          </div>
              
              <div className = {Style.productWrapper}>
                   {isAllproduct && renderProducts(products)}
                   {brands.isBrand && renderProducts(brands.items)} 
                   {colors.isColor && renderProducts(colors.items)} 
                   {prices.isPrice && renderProducts(prices.items)}    
              </div>  
            
        </div>
        <Footer/> 
        </>
    )
}
export default ProductList;