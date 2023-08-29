import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import {addCart} from '../redux/action'
import React, { useEffect, useState} from "react";
import {useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

 const Product = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct]= useState([]);
    const [loading, setLoading]= useState(false);
    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }
    useEffect(() => {
        const getProduct = async () => {
          setLoading(true);
          try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }
            setProduct(await response.json());
            setLoading(false);
          } catch (error) {
            console.error("Error fetching product:", error);
            setLoading(false);
          }
        };
      
        getProduct();
      }, [id]);
      
const GotoCart = () => {
    navigate("/cart"); 
  };
const Loading = () => {
   return(
   <>
     <div className= "col-md-6">
        <Skeleton height={400} />
   </div>
   <div className="col-md-6" style={{lineHeight:2}}>
    <Skeleton height={50} width={300} />
    <Skeleton height={75} />
    <Skeleton height={25} width={150} />
    <Skeleton height={50} />
    <Skeleton height={150} />
    <Skeleton height={50} width={100} />
    <Skeleton height={50} width={100}  style={{marginLeft:6}}/>
   </div>
   </>
)
}
const ShowProduct = () => {
    return (
    <>
    <Navbar/>
  
    <div className="col-md-6">
        <img src={product.image} alt={product.title}  height="400px" width="400px" />
        </div>

        <div className="col-md-6">
            <h4 className="text-uppercase text-black-50">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead fw-bolder">
                Rating {product.rating && product.rating.rate} <i className="fa fa-star"></i>
            </p>
<h3 className="display-6 fw-bold my-4 "> $ {product.price} </h3>
<p className="lead"> {product.description}</p>
<button className="btn-outline-dark" onClick={()=>addProduct(product)}> Add to cart</button>
<button onClick={GotoCart} className="btn btn-dark ms-2 px-3"> CART </button>
        </div>
   
</>
)}
return (
    <div>
        <div className="container py-5">
            <div className="row"> {loading? <Loading/>  : <ShowProduct/>}
            </div>
        </div>
    </div>
);
 }
 export default Product ; 