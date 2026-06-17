import React from 'react';

function Hero() {
    return (
        <div className='container mt-5'>
            <div className='row mt-5 mb-5 text-center'>
                <h1>Charges</h1>
                <p className='text-muted'>List of all charges and taxes</p>
            </div>
            <div className='row mt-5 mb-5 text-center'>
                <div className='col-md-4 col-12 mb-5 d-flex flex-column align-items-center'>
                    <img src='media/images/pricing-eq.svg' alt='Pricing' className='img-fluid mb-3' style={{ width: "120px" }} />
                    <h4>Free equity delivery</h4>
                    <p className='text-muted'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className='col-md-4 col-12 mb-5 d-flex flex-column align-items-center'>
                    <img src='media/images/other-trades.svg' alt='Pricing' className='img-fluid mb-3' style={{ width: "120px" }} />
                    <h4>Intraday and F&O trades</h4>
                    <p className='text-muted'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity.</p>
                </div>
                <div className='col-md-4 col-12 mb-5 d-flex flex-column align-items-center'>
                    <img src='media/images/pricing-eq.svg' alt='Pricing' className='img-fluid mb-3' style={{ width: "120px" }} />
                    <h4>Free direct MF</h4>
                    <p className='text-muted'>All direct mutual fund investments are absolutely free — ₹ 0 commissions &amp; DP charges.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;