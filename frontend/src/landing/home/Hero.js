import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='container p-md-5 p-4'>
            <div className='row text-center'>
                <img src='media/images/landing.png' alt='Landing Image' className='mb-5 img-fluid' />
                <h1>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <div>
                    <Link to='/signup' className='p-3 btn btn-primary fs-5 mt-4 cta-btn'>Sign up for free</Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;
