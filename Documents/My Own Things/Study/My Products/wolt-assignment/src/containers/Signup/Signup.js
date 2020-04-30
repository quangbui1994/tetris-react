import React from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import * as styles from './Signup.module.css';
import { useFormFields } from '../../libs/hooksLib';
import { useState } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import { errorMessageHandler } from '../../libs/errorMessageHandler';

const Singup = (props) => {
    const [fields, setFields] = useFormFields({
        email: '',
        password: '',
        confirmPassword: '',
        confirmCode: ''
    });

    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);


    const handleSubmit = async e => {
        e.preventDefault();
        setIsAuthenticating(true);
        setError('');
        try {
            await Auth.signUp(fields.email, fields.password);
            setNewUser(true);
            setIsAuthenticating(false)
        } catch (e) {
            setError(errorMessageHandler(e.message));
            setIsAuthenticating(false);
        }
    }

    const handleVerify = async () => {
        setIsAuthenticating(true);
        try {
            await Auth.confirmSignUp(fields.email, fields.confirmCode);
            await Auth.signIn(fields.email, fields.password);

            setIsAuthenticating(false);
            props.history.push('/');
        } catch (e) {
            console.log(e.message);
            setIsAuthenticating(false);
        }
    }

    const validateSignupForm = () => {
        return (fields.email.length > 0 
            && fields.password.length > 0 
            && fields.password === fields.confirmPassword)
    }

    const validateConfirmForm = () => {
        return fields.confirmCode.length > 0;
    }

    const signUpForm = (
        <form className={styles.Signup} onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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
                <label htmlFor="email">Password</label>
            <input 
                value={fields.confirmPassword}
                onChange={setFields}
                className={styles.InputElement}
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"/>
                <label htmlFor="email">Confirm Password</label>
            <button disabled={!validateSignupForm()}>
                <Spinner isAuthenticating={isAuthenticating}/>
                Submit
            </button>
            {error ? <div className={styles.errorMessage}>{error}</div> : null}
        </form>
    )

    const verifyForm = (
        <form className={styles.Verify} onSubmit={handleVerify}>
            <h2>Verify Code</h2>
            <input 
                value={fields.confirmCode}
                onChange={setFields}
                className={styles.InputElement}
                id="confirmCode"
                placeholder="Confirm Code"
                type="text"/>
                <label htmlFor="email">Confirm Code</label>
            <button disabled={!validateConfirmForm()}>
                {/* <Spinner /> */}
                Submit
            </button>
        </form>
    )

    return (
        <>
            {!newUser ? signUpForm : verifyForm}
        </>
    )
};

export default withRouter(Singup);