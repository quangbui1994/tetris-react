import React, { useState } from 'react';
import * as styles from './Login.module.css';
import { useFormFields } from '../../libs/hooksLib';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';

const LogIn = (props) => {
    const [fields, setFields] = useFormFields({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const validateSignInForm = () => {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setIsAuthenticating(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            setIsAuthenticating(false);
            props.setUserAuthenticated(true);
        } catch (e) {
            setIsAuthenticating(false);
            setError(e.message);
        }
    }

    return (
        <form className={styles.Login} onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input 
                value={fields.email}
                onChange={setFields}
                className={styles.InputElement}
                id="email"
                type="text"
                placeholder="Email"/>
                <label htmlFor="email">Email</label>
            <input 
                value={fields.password}
                onChange={setFields}
                className={styles.InputElement}
                id="password"
                placeholder="Password"
                type="password"/>
                <label htmlFor="password">Password</label>
            <button disabled={!validateSignInForm()}>
                <Spinner isAuthenticating={isAuthenticating}/>
                Submit
            </button>
            {error ? <div className={styles.errorMessage}>{error}</div> : null}
        </form>
    )
};

export default withRouter(LogIn);