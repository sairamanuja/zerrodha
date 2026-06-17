import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

// Where the trading dashboard app is served.
const DASHBOARD_URL = 'http://localhost:3000';

function Signup() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        phone: '',
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const update = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const validateStep1 = () => {
        const next = {};
        if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
            next.phone = 'Enter a valid 10-digit mobile number';
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const validateStep2 = () => {
        const next = {};
        if (form.name.trim().length < 3) next.name = 'Enter your full name';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
            next.email = 'Enter a valid email address';
        if (form.password.length < 6)
            next.password = 'Password must be at least 6 characters';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleContinue = (e) => {
        e.preventDefault();
        if (validateStep1()) setStep(2);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        if (!validateStep2()) return;
        setSubmitting(true);
        // Mock account creation — persist a lightweight session then enter the app.
        try {
            localStorage.setItem(
                'zerodha_user',
                JSON.stringify({ name: form.name, email: form.email, phone: form.phone })
            );
        } catch (_) {
            /* ignore storage errors */
        }
        // The dashboard runs on a different origin (port 3000), so localStorage
        // here is not visible there. Pass the user across in the URL; the
        // dashboard reads these params and persists them in its own storage.
        const params = new URLSearchParams({
            name: form.name,
            email: form.email,
            phone: form.phone,
        });
        // Small delay so the loading state is visible, then open the dashboard.
        setTimeout(() => {
            window.location.href = `${DASHBOARD_URL}/?${params.toString()}`;
        }, 900);
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-left">
                    <img
                        src="media/images/logo.svg"
                        alt="Zerodha"
                        className="signup-logo"
                    />
                    <h2>Open a free demat account</h2>
                    <p>
                        Invest in stocks, derivatives, mutual funds, IPOs and more.
                        Flat ₹20 brokerage, ₹0 on equity delivery.
                    </p>
                    <ul className="signup-perks">
                        <li>₹0 account opening charges</li>
                        <li>Trusted by 1.6+ crore investors</li>
                        <li>Powerful, easy-to-use Kite platform</li>
                    </ul>
                    <img
                        src="media/images/signup.png"
                        alt=""
                        className="signup-illustration"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>

                <div className="signup-right">
                    <div className="signup-steps">
                        <span className={step === 1 ? 'dot active' : 'dot done'}>1</span>
                        <span className="dot-line" />
                        <span className={step === 2 ? 'dot active' : 'dot'}>2</span>
                    </div>

                    {step === 1 && (
                        <form className="signup-form" onSubmit={handleContinue} noValidate>
                            <h3>Signup now</h3>
                            <p className="signup-sub">
                                Or track your existing application
                            </p>

                            <label htmlFor="phone">Mobile number</label>
                            <div className={`phone-field ${errors.phone ? 'has-error' : ''}`}>
                                <span className="cc">+91</span>
                                <input
                                    id="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    placeholder="Enter your 10 digit number"
                                    value={form.phone}
                                    onChange={update('phone')}
                                    autoFocus
                                />
                            </div>
                            {errors.phone && <span className="err">{errors.phone}</span>}

                            <button type="submit" className="signup-btn">
                                Continue
                            </button>

                            <p className="signup-foot">
                                By proceeding, you agree to the Zerodha{' '}
                                <a href="#terms" onClick={(e) => e.preventDefault()}>
                                    terms
                                </a>{' '}
                                &amp;{' '}
                                <a href="#privacy" onClick={(e) => e.preventDefault()}>
                                    privacy policy
                                </a>
                                .
                            </p>
                        </form>
                    )}

                    {step === 2 && (
                        <form
                            className="signup-form"
                            onSubmit={handleCreateAccount}
                            noValidate
                        >
                            <h3>Create your account</h3>
                            <p className="signup-sub">
                                Signing up with <strong>+91 {form.phone}</strong>{' '}
                                <button
                                    type="button"
                                    className="link-btn"
                                    onClick={() => setStep(1)}
                                >
                                    change
                                </button>
                            </p>

                            <label htmlFor="name">Full name</label>
                            <input
                                id="name"
                                type="text"
                                className={errors.name ? 'has-error' : ''}
                                placeholder="As per your PAN"
                                value={form.name}
                                onChange={update('name')}
                                autoFocus
                            />
                            {errors.name && <span className="err">{errors.name}</span>}

                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className={errors.email ? 'has-error' : ''}
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={update('email')}
                            />
                            {errors.email && <span className="err">{errors.email}</span>}

                            <label htmlFor="password">Create password</label>
                            <input
                                id="password"
                                type="password"
                                className={errors.password ? 'has-error' : ''}
                                placeholder="Minimum 6 characters"
                                value={form.password}
                                onChange={update('password')}
                            />
                            {errors.password && (
                                <span className="err">{errors.password}</span>
                            )}

                            <button
                                type="submit"
                                className="signup-btn"
                                disabled={submitting}
                            >
                                {submitting ? 'Creating account…' : 'Create account & continue'}
                            </button>

                            <p className="signup-foot">
                                Already have an account?{' '}
                                <a
                                    href={DASHBOARD_URL}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = DASHBOARD_URL;
                                    }}
                                >
                                    Go to dashboard
                                </a>
                            </p>
                        </form>
                    )}

                    <Link to="/" className="signup-back">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
