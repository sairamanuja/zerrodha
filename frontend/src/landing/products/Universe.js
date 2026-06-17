import React from 'react';
import { Link } from 'react-router-dom';

function Universe() {
    return (
        <div className='container text-center px-4 py-5 my-5'>
            <div className='row'>
                <p className='text-secondary'>Want to know more about our technology stack? Check out the <a href='#tech' className='text-primary text-decoration-none'>Zerodha.tech</a> blog.</p>
            </div>
            <div className='row mt-4'>
                <h3>The Zerodha Universe</h3>
                <p className='text-secondary'>Extend your trading and investment experience even further with our partner platforms</p>
            </div>
            <div className='row mt-4 d-flex justify-content-center'>
                <img src='media/images/universe.png' alt='Zerodha Universe' className='img-fluid' style={{ maxWidth: "760px", width: "100%" }} />
            </div>
            <div className='row mt-5'>
                <div>
                    <Link to='/signup' className='p-3 btn btn-primary fs-5 cta-btn'>Sign up for free</Link>
                </div>
            </div>
        </div>
    );
}

export default Universe;
