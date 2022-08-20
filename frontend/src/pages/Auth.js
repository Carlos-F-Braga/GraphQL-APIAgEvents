import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import Popup from '../components/Popup/Popup';
import Backdrop from '../components/Backdrop/Backdrop';
import Background from '../components/Background/Background';
import { ApiContext } from '../context/api-context';

import './Auth.css';

class AuthPage extends Component{
    state = {
        isLogin: true,
        popup: false,
        isMobile: false
    };

    PopupCancelHandler = () => {
        this.setState({popup: false});
      }
    PopupOpenHandler = () => {
        this.setState({popup: true});
      }

    constructor (props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }

    static contextType = AuthContext;



    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const api = ApiContext._currentValue;

        if (email.trim().length === 0 || password.trim().length === 0) {
            this.PopupOpenHandler();
            return;
        }

        let requestBody = {
            query: `
            query Login($email: String!, $password: String!){
                login(email: $email, password: $password) {
                    userId
                    token
                    tokenExpiration
                }
            }
            `,
            variables: {
                email: email,
                password: password  
            }
        };

        if (!this.state.isLogin){
            requestBody = {
                query: `
                  mutation CreateUser($email: String!, $password: String!) {
                      createUser(userInput: {email: $email, password: $password}){
                          _id
                          email
                      }
                  }
                `,
                variables: {
                    email: email,
                    password: password
                }
            };
        };



        fetch(api, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201){
                this.PopupOpenHandler();
                throw new Error('Failed!');
            }

            return res.json();

        })
        .then (resData => {
            if (!this.state.isLogin ){

                this.switchModeHandler();
                this.passwordEl.current.value = "";
                this.emailEl.current.value = "";

                if (resData.data.createUser == null) {
                this.PopupOpenHandler();
                throw new Error('Failed!');
                }

            }
            if (resData.data.login.token) {
                this.context.login(
                    resData.data.login.token,
                    resData.data.login.userId,
                    resData.data.login.tokenExpiration
                )
            }

            }

        )
        .catch(err => {
            console.log(err)
        });
    };

    render() {
        return (
        <React.Fragment>
        <Background/>
        {this.state.popup && <Backdrop />}
        {this.state.popup && <Popup title="Dados Incorretos!" canPopup PopuponConfirm={this.PopupCancelHandler}>
            <p className="bold">Seus Dados estão Incorretos!</p>
        </Popup>}   
        <form className="auth-form" onSubmit={this.submitHandler}> 
            <div className="form-control">
                <label htmlFor="email" className='cad'>E-mail</label>
                <input type="email" id="email" className='Auth-Input' ref={this.emailEl} />
            </div>
            <div className="form-control">
                <label htmlFor="password" className='cad'>Senha</label>
                <input type="password" id="password" className='Auth-Input' ref={this.passwordEl} />
            </div>
            <div className="form-actions">
                <button type="submit" >Enviar</button>
                <button type="button" onClick={this.switchModeHandler}>Realizar o {this.state.isLogin ? 'Cadastro' : 'Login'}</button>
            </div>
        </form>
        </React.Fragment>
        )
    }
}

export default AuthPage;