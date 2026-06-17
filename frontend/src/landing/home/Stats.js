import React from 'react';

function Stats() {
    return (
        <div className='container px-4 py-5'>
            <div className='row'>
                <div className='col-lg-5 col-12 d-flex flex-column justify-content-center mb-5 mb-lg-0'>
                    <h2 className='mb-5'>Trust with confidence</h2>
                    <div className='mb-4'>
                        <h4>Customer-first always</h4>
                        <p className='text-secondary'>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
                    </div>
                    <div className='mb-4'>
                        <h4>No spam or gimmicks</h4>
                        <p className='text-secondary'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <a href='#philosophy' className='text-primary text-decoration-none'>Our philosophies.</a></p>
                    </div>
                    <div className='mb-4'>
                        <h4>The Zerodha universe</h4>
                        <p className='text-secondary'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    </div>
                    <div className='mb-4'>
                        <h4>Do better with money</h4>
                        <p className='text-secondary'>With initiatives like <a href='#nudge' className='text-primary text-decoration-none'>Nudge</a> and <a href='#killswitch' className='text-primary text-decoration-none'>Kill Switch</a>, we don't just facilitate transactions, but actively help you do better with your money.</p>
                    </div>
                </div>
                <div className='col-lg-7 col-12'>
                    <img src='media/images/ecosystem.png' alt='Ecosystem' className='img-fluid' />
                    <p className='mt-4 text-center fs-5'>
                        <a href='#products' className='mx-2 text-primary text-decoration-none'>Explore our products <i className="fa-solid fa-arrow-right"></i></a>
                        <a href='#kite' className='mx-2 text-primary text-decoration-none'>Try Kite demo <i className="fa-solid fa-arrow-right"></i></a>
                    </p>
                </div>
            </div>
            <div className='row text-center mt-5'>
                <img src='media/images/press-logos.png' alt='Press Logos' className='img-fluid mb-5 mx-auto d-block' style={{ maxWidth: "90%", width: "680px" }} />
            </div>
        </div>
    );
}

export default Stats;
