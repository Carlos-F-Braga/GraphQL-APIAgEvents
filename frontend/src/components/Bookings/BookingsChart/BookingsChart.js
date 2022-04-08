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
         console.log(bucket);
         chartData.labels.push(bucket);
         chartData.datasets.push({
                //label: "My First Dataset",
                fillColor: 'rgba(6, 207, 252, 0.5)',
                strokeColor: 'rgba(81, 1, 209, 0.5)',
                highlightFill: 'rgba(6, 207, 252, 1)',
                highlightStroke: 'rgba(81, 1, 209, 1)',
                data: values
         });
         values = [...values]
         values[values.length - 1] = null
     }
    return <BarChart className="bar" data={chartData} />;
};

export default bookingsChart;