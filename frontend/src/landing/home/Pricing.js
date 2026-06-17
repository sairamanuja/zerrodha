import React from 'react';
import { Link } from 'react-router-dom';

function Pricing() {
    return (
        <div className='container my-5 px-4 py-5'>
            <div className='row align-items-center'>
                <div className='col-lg-4 col-12 mb-4 mb-lg-0'>
                    <h1>Unbeatable pricing</h1>
                    <p className='text-secondary'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <Link to='/pricing' className='text-primary text-decoration-none fs-5'>See pricing <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
                <div className='col-lg-8 col-12 d-flex flex-row align-items-center'>
                    <img src='media/images/pricing.png' alt='Pricing' className='img-fluid' style={{ width: "100%" }} />
                </div>
            </div>
        </div>
    );
}

export default Pricing;
