import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

//export const MainNavigation = props => ( jeito certo
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (    
            <header className="main-navigation">
            <div className="main-navigation__logo">
            <h1 onClick={context.logout}>AgEvent - The Advance of Events</h1>
            </div>
            <nav className="main-navigation__items">
                <ul>
                    {!context.token && 
                    (<li>
                        <NavLink to="/auth">Login</NavLink>
                    </li>
                    )}
                    <li> 
                        <NavLink to="/events">Eventos</NavLink>
                    </li>
                    {context.token && (
                    <React.Fragment>
                    <li> 
                        <NavLink to="/bookings">Agendamentos</NavLink>
                    </li>
                    <li>
                        <button onClick={context.logout}>Logout</button>
                    </li>
                    </React.Fragment>
                    )}
                </ul>
            </nav>
        </header>)
        }}
    </AuthContext.Consumer>
);

export default mainNavigation; //jeito errado