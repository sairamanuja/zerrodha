import React, { useState } from 'react';

const categories = [
    'Account Opening',
    'Your Zerodha Account',
    'Kite',
    'Funds',
    'Console',
    'Coin',
    'Others',
];

function CreateTicket({ onBack }) {
    const [form, setForm] = useState({
        category: '',
        subject: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState('');

    const update = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const validate = () => {
        const next = {};
        if (!form.category) next.category = 'Please select a category';
        if (form.subject.trim().length < 5) next.subject = 'Subject must be at least 5 characters';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address';
        if (form.message.trim().length < 15) next.message = 'Please describe your issue (min 15 characters)';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // Mock ticket creation — deterministic id derived from the input.
        const id = 'ZT' + (100000 + ((form.subject.length * 31 + form.email.length * 7) % 899999));
        setTicketId(id);
        setSubmitted(true);
    };

    return (
        <div className='container my-5'>
            <div className='row justify-content-center'>
                <div className='col-lg-8 col-12'>
                    <div className='d-flex align-items-center justify-content-between mb-4'>
                        <h2 className='fw-semibold m-0'>Create a ticket</h2>
                        <button className='btn btn-outline-secondary btn-sm' onClick={onBack}>
                            <i className='fa-solid fa-arrow-left'></i> Back to support
                        </button>
                    </div>

                    {submitted ? (
                        <div className='ticket-success'>
                            <div className='tick'>✓</div>
                            <h4 className='mb-2'>Your ticket has been created</h4>
                            <p className='text-muted mb-1'>
                                We've received your request and our team will get back to you within 24 hours.
                            </p>
                            <p className='mb-4'>
                                Ticket reference: <span className='ticket-ref'>#{ticketId}</span>
                            </p>
                            <button className='btn btn-primary' onClick={onBack}>
                                Back to support portal
                            </button>
                        </div>
                    ) : (
                        <form className='ticket-form-card' onSubmit={handleSubmit} noValidate>
                            <div className='mb-3'>
                                <label className='form-label fw-medium'>Category</label>
                                <select
                                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                    value={form.category}
                                    onChange={update('category')}
                                >
                                    <option value=''>Select a category</option>
                                    {categories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {errors.category && <div className='invalid-feedback'>{errors.category}</div>}
                            </div>

                            <div className='mb-3'>
                                <label className='form-label fw-medium'>Subject</label>
                                <input
                                    type='text'
                                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                                    placeholder='Brief summary of your issue'
                                    value={form.subject}
                                    onChange={update('subject')}
                                />
                                {errors.subject && <div className='invalid-feedback'>{errors.subject}</div>}
                            </div>

                            <div className='mb-3'>
                                <label className='form-label fw-medium'>Email</label>
                                <input
                                    type='email'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder='you@example.com'
                                    value={form.email}
                                    onChange={update('email')}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='mb-4'>
                                <label className='form-label fw-medium'>Describe your issue</label>
                                <textarea
                                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                    rows='5'
                                    placeholder='Tell us what went wrong, with as much detail as possible…'
                                    value={form.message}
                                    onChange={update('message')}
                                ></textarea>
                                {errors.message && <div className='invalid-feedback'>{errors.message}</div>}
                            </div>

                            <button type='submit' className='btn btn-primary px-4'>
                                Submit ticket
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;
