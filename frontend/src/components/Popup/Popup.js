import React from 'react';

import './Popup.css';

const popup = props => (
    <div className="popup">
        <header className="popup__header">
            <h1>
                {props.title}
            </h1>
        </header>
        <section className="popup__content">{props.children}</section>
        <section className="popup__actions">
            {props.canPopup && <button className="btnpopup" onClick={props.PopuponConfirm}>
                Sair
            </button>}
        </section>
    </div>
);

export default popup;