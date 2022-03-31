import React from "react";

import './EventItem.css';

const eventItem = props => (
    <li key={props.eventId} className="events__list-item">
        <div>
            <h1>{props.title}</h1>
            <h2>R${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
        </div>
        <div>
            {props.userId === props.creatorId ? ( 
            <p className="cad">Voce é o Criador deste Evento!</p> 
            ) : ( 
            <button className="btn" onClick={props.onDetail.bind(this, props.eventId)}>Ver Detalhes</button>
            )}
        </div>
    </li>

)

export default eventItem;