import React, { useState } from 'react';
import './Recharge.css';

function Recharge() {
    const plans = [
        { name: 'Basic Plan', amount: 99, perks: ['1.5GB'], validity: 'Base Plan', badge: '' },
        { name: 'Standard Plan', amount: 500, perks: ['2GB/Day', 'Unlimited Calls', '100 SMS/day'], validity: '28 Days', badge: 'Favourite' },
        { name: 'Premium Plan', amount: 809, perks: ['2GB/Day + 20GB', 'Unlimited Calls', '100 SMS/day'], validity: '90 Days', badge: '' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Popular');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPlans = plans.filter(plan => 
        plan.validity.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="recharge-container">
            <div className="header">
                <h1>Select a recharge plan</h1>
            </div>
            <input
                type="text"
                placeholder="Search for a plan, eg 249 or 28days "
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
            />
           
            <div className="card-container">
                {filteredPlans.map((plan, index) => (
                    <div key={index} className="card">
                        {plan.badge && <div className="badge">{plan.badge}</div>}
                        <div className="card-header">
                            <div className="amount">₹{plan.amount}</div>
                            <div className="data">Data: {plan.perks[0]}</div>
                            <div className="validity">Validity: {plan.validity}</div>
                        </div>
                      
                        {plan.perks.length > 1 && <p>Voice: {plan.perks[1]}</p>}
                        {plan.perks.length > 2 && <p>SMS: {plan.perks[2]}</p>}
                       
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recharge;
