import React from 'react';

const brokerageRows = [
    { segment: 'Equity delivery', brokerage: 'Zero Brokerage' },
    { segment: 'Equity intraday', brokerage: '0.03% or ₹20/executed order (whichever is lower)' },
    { segment: 'Equity futures', brokerage: '0.03% or ₹20/executed order (whichever is lower)' },
    { segment: 'Equity options', brokerage: 'Flat ₹20 per executed order' },
    { segment: 'Currency futures', brokerage: '0.03% or ₹20/executed order (whichever is lower)' },
    { segment: 'Currency options', brokerage: 'Flat ₹20 per executed order' },
    { segment: 'Commodity futures', brokerage: '0.03% or ₹20/executed order (whichever is lower)' },
    { segment: 'Commodity options', brokerage: 'Flat ₹20 per executed order' },
];

const charges = [
    { name: 'STT/CTT', desc: 'Securities/Commodities Transaction Tax levied by the government on traded value.' },
    { name: 'Transaction charges', desc: 'Charged by the exchanges (NSE, BSE, MCX) on the value of your transactions.' },
    { name: 'GST', desc: '18% on (brokerage + SEBI charges + transaction charges).' },
    { name: 'SEBI charges', desc: '₹10 per crore charged by the Securities and Exchange Board of India.' },
    { name: 'Stamp charges', desc: 'As per the Indian Stamp Act of 1899 for trading instruments.' },
    { name: 'DP charges', desc: '₹13.5 + GST per scrip (irrespective of quantity) on the debit day.' },
];

function Brokerage() {
    return (
        <div className='container px-4 py-5 mb-5'>
            <div className='row mb-4'>
                <div className='col-12 text-center'>
                    <h2 className='mb-2'>Brokerage charges</h2>
                    <p className='text-muted'>Simple, transparent pricing. No hidden charges.</p>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-lg-9 col-12'>
                    <div className='table-responsive brokerage-table'>
                        <table className='table align-middle'>
                            <thead>
                                <tr>
                                    <th>Segment</th>
                                    <th>Brokerage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brokerageRows.map((row) => (
                                    <tr key={row.segment}>
                                        <td className='fw-medium'>{row.segment}</td>
                                        <td className={row.brokerage === 'Zero Brokerage' ? 'text-success fw-semibold' : 'text-muted'}>
                                            {row.brokerage}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='row mt-5'>
                <div className='col-12 text-center mb-4'>
                    <h3>Charges explained</h3>
                </div>
                {charges.map((c) => (
                    <div className='col-lg-4 col-md-6 col-12 mb-4' key={c.name}>
                        <div className='charge-card h-100'>
                            <h5 className='mb-2'>{c.name}</h5>
                            <p className='text-muted mb-0'>{c.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Brokerage;
