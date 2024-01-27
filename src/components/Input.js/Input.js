import React from'react';
import classes from '../Login/Login.module.css'
const Input = (props)=>{
    return(
        <React.Fragment>
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={props.emailState.value}
            onChange={props.emailChangeHandler}
            onBlur={props.validateEmailHandler}
          />
        </div>
        
        <div
          className={`${classes.control} ${
            props.passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={props.passwordState.value}
            onChange={props.passwordChangeHandler}
            onBlur={props.validatePasswordHandler}
          />
        </div>
        </React.Fragment>
    )
}
export default Input;