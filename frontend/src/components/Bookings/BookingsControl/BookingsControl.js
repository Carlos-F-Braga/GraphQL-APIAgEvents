import React from 'react';

import './BookingsControl.css';

const bookingsControl = props => {
return (
    <div className="bookings-control">
        <button 
            className={props.activeOutputType==='list' ? 'active' : ''}
            onClick={props.onChange.bind(this, 'list')}
        >
            Lista
        </button>
        <button
            className={props.activeOutputType==='chart' ? 'active' : ''}
            onClick={props.onChange.bind(this, 'chart')}
        >
            Gráfico
        </button>
    </div>
);
}

export default bookingsControl;