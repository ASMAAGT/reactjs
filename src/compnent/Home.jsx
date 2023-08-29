import React from 'react'
import Products from './Products'
import Navbar from './Navbar/Navbar'

export default function Home() {
    return (
        <>
        <Navbar /> {/* La barre de navigation est toujours affichée */}

        <div className='hero'>
            <div className="card text-bg-dark text-white border-0">
                <img src="/assets/bg.jpg" 
                class="card-img" alt="Background" height="850px"/>

                <div className="card-img-overlay d-flex flex-column justify-content-center">

                    <div className="container ">

                    </div>
                    <h5 className="card-title display-2 fw-bolder mb-6">

                        NEW SEASON ARRIVALS</h5>
                    <p className="card-text lead fs-1">

                        CHECK OUT ALL THE TRENDS       
                   </p>
                    
                </div>
            </div>
            <Products/>
        </div>
        </>
    )
}
