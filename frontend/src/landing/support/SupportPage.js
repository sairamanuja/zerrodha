import React, { useState } from 'react';
import Hero from './Hero';
import CreateTicket from './CreateTicket';
import SupportHome from './SupportHome';

function SupportPage() {
    const [view, setView] = useState('home'); // 'home' | 'ticket'

    return (
        <>
            <Hero onMyTickets={() => setView('ticket')} />
            {view === 'ticket' ? (
                <CreateTicket onBack={() => setView('home')} />
            ) : (
                <SupportHome onCreateTicket={() => setView('ticket')} />
            )}
        </>
    );
}

export default SupportPage;
