import Style from '../navItems/productList.module.css';
import Style1 from '../navItems/home.module.css';
import Product from '../product/product';
import Footer from '../footer/footer';
import { useEffect ,useState} from 'react';
import axiosClient from '../api/axiosClient';
const url = "http://localhost:5000/";
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
  const [products,setProducts]=useState([]);
  const [brands,setBrands] = useState({isBrand:false, items:null});//is brands = true,brands 
  const [colors,setColors] = useState({isColor:false ,items:null});
  const [prices,setPrices] = useState({isPrice:false,items:null});
  const [isAllproduct,setIsAllProduct] = useState(true);
  useEffect(()=>{
    const  readProduct=async()=>{
      try{
       const res= await axiosClient.get("readProduct")
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


  const brand = [];
  products.forEach((ele)=>{
        if(!brand.includes(ele.brand))
        {brand.push(ele.brand);}
  })
  // prices 
  const price = [];
  products.forEach((ele)=>{
    if(!price.includes(ele.price))
    {price.push(ele.price);}
})
  
  // color
  const color = [];
  products.forEach((ele)=>{
    if(!color.includes(ele.color))
    {color.push(ele.color);}
})

const renderProducts = (items) =>
  items?.map((obj) => (
    <Product key={obj._id} image={`${url}${obj.imageName[0]}`} description={obj.description} price={obj.price} rating={3} />
  ));

  

    return(
        <>
        <div className={Style.productListWrapper}>
          <div className={Style.wholeSortWrapper}>
                <div className ={Style.sortWrapper}>
                      <h2 className={Style.saleTitle}>Brand</h2>
                      <div className={Style.sortCotainer}>
                      
                      {
                        brand.map((ele,index)=>{
                          return <SortItem key={index} name={ele} dataValue={JSON.stringify({key:"brand",value:ele})} sortBtnClick = {sortBtnClick}/>
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
                          return <SortItem  key={index} name={ele} dataValue={JSON.stringify({key:"color",value:ele})}  sortBtnClick = {sortBtnClick}/>
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