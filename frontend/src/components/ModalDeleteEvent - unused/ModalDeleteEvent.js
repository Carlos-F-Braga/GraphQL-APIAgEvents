import React from 'react';

import './ModalDeleteEvent.css';

const modaldel = props => (
    <div className="modaldel">
        <header className="modaldel__header">
            <h1>
                {props.title}
            </h1>
        </header>
        <section className="modaldel__content">{props.children}</section>
        <section className="modaldel__actions">
            {props.canCancel && <button className="btn" onClick={props.onCancel}>
                Cancelar
            </button>}
            <button className="btn" onClick={props.onDelete.bind(this, props.eventId)}>
                Deletar
            </button>
        </section>
    </div>
);

export default modaldel;