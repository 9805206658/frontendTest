import Style from './home.module.css';
// here making the array for the image

function FlashSale({image,brand,percentage})
{
    // storing the iflash sale image in the  databasel
    return(
    <div> 
         <div class="imgcrousel">
         <img src={`/flashSale/${image}`} alt="Furry Presents" loading="lazy" />
           <div class="discount_wrapper">
                <p>{`${brand}`}</p>
                <p>{`${percentage}`}</p>
               </div>
               <div class="free_deliver discount_wrapper">Free deliver</div>
               <div class="discount_wrapper brand">brand</div>
         </div>    
    </div>
    )

}
function Home()
{
    // here declaring the require array
    const images = ["blue.jpg","green.jpg","red.jpg","smooth.jpg"];
    const brand = ["Mercery","zigzag","kkkk","jjjjj"];
    const percentage = [10,30,10,50];
    return(
        <>
        <FlashSale />
        <div className={Style.container}>this home page</div>
        </>
    )
}
export default Home;