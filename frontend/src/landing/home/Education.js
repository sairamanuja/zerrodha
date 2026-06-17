import React from 'react';

function Education() {
    return (
        <div className='container my-5 px-4 py-5'>
            <div className='row align-items-center'>
                <div className='col-lg-6 col-12 d-flex flex-column justify-content-center mb-4 mb-lg-0 text-center'>
                    <img src='media/images/index-education.svg' alt='Education' className='img-fluid mx-auto' style={{ width: "90%" }} />
                </div>
                <div className='col-lg-6 col-12'>
                    <h1 className='mb-4'>Free and open market education</h1>
                    <p className='text-secondary'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href='#varsity' className='text-primary text-decoration-none fs-5'>Varsity <i className="fa-solid fa-arrow-right"></i></a>
                    <p className='mt-5 text-secondary'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href='#tradingqa' className='text-primary text-decoration-none fs-5'>TradingQ&A <i className="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Education;
