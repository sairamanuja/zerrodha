import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return (
        <div className='container p-md-5 p-4'>
            <div className='row text-center'>
                <h1 className='mb-4'>Open a Zerodha account</h1>
                <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <div>
                    <Link to='/signup' className='p-3 btn btn-primary fs-5 mt-4 cta-btn'>Sign up for free</Link>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;
