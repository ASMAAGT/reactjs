import React, { useState, useEffect,  } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useNavigate } from 'react-router-dom/dist';


export default function Products() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const responseData = await response.json();
                setData(responseData);
                setFilter(responseData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };
        

        getProducts();

        return () => {
            componentMounted = false;
        };
    }, []);


    const Loading = () => {
        return (
            <> 
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        )
        }

const filterProduct=(cat)=>{
    const updatedList=data.filter((x)=>x.category===cat);
    setFilter (updatedList);
}
const handleBuyNow = (productId) => {
    navigate(`/products/${productId}`);
  };

    const ShowProducts = () => {
       
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2 "onClick={()=>setFilter(data)}> All</button>
                    <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("men's clothing")}> Men's Clothing </button>
                    <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("women's clothing")}> Women's Clothing </button>
                    <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("jewelery")}> jewelery </button>
                    <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("electronics")}> Electronics </button>
                </div>
                       {filter.map((Product) => {
                    return (
                        <>
                            <div className="col-md-3">

                                <div class="card h-100 text-center p-4" key={Product.id} >
                 <img src={Product.image} class="card-img-top" alt={Product.title} height="250"/>
                 <div class="card-body">
                     <h5 class="card-title mb-0">
                         {Product.title.substring(0,12)}
                         </h5>
                     <p class="card-text lead fw-bold">
                        $ {Product.price}
                        </p>
                        <NavLink
      to={`/products/${Product.id}`}
      className="btn btn-outline-dark"
      onClick={() => handleBuyNow(Product.id)}
    >
      Buy Now
    </NavLink>
                 </div>
                 </div>
                 </div>
                 </>
                    );


                })}
                </>
        );
    };
            
        
    


    return (
        <div>
            <div className="container my-5 py-5 ">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder 
                        text-center"> Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-cenetr">
                    {loading ? <loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
    }
