import React from "react";

import { Bar as BarChart } from 'react-chartjs';

import './BookingsChart.css';

const BOOKINGS_BUCKETS = {
    'Barato': {
        min: 0,
        max: 100
    },
    'Normal': { 
        min: 100,
        max: 200
},
    'Caro': {
        min: 250,
        max: 500
},
    'Luxo': {
        min: 500,
        max: 10000000000}
};

const bookingsChart = props => {
     const chartData = {labels: [], datasets: []};
     let values = [];
     for (const bucket in BOOKINGS_BUCKETS){
         const filteredBookingsCount = props.bookings.reduce((prev, current) => {
             if (current.event.price > BOOKINGS_BUCKETS[bucket].min &&
                 current.event.price < BOOKINGS_BUCKETS[bucket].max
                 ) {
            return prev + 1;
             } else {
                 return prev; 
            }
         }, 0);
         values.push(filteredBookingsCount);
         chartData.labels.push(bucket);
         chartData.datasets.push({
                //label: "My First Dataset",
                fillColor: 'rgba(220,220,220,0.5)',
                strokeColor: 'rgba(220,220,220,0.8)',
                highlightFill: 'rgba(220,220,220,0.75)',
                highlightStroke: 'rgba(220,220,220,1)',
                data: values
         });
         values = [...values]
         values[values.length - 1] = null
     }
    return <div><BarChart data={chartData} /></div>;
};

export default bookingsChart;