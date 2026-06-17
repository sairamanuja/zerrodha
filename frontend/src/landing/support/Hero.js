import React from 'react';

function Hero({ onMyTickets }) {
    return (
        <div className="container-fluid bg-light py-5 px-md-5 px-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h2 className="fw-semibold text-muted m-0">Support Portal</h2>
                <button className="btn btn-primary" onClick={onMyTickets}>
                    <i className="fa-solid fa-bullseye"></i> My tickets
                </button>
            </div>

            <div className="input-group shadow-sm" style={{ height: "65px" }}>
                <span className="input-group-text bg-white border-end-0">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Eg: how do I activate F&O..."
                />
            </div>
        </div>
    );
}

export default Hero;
