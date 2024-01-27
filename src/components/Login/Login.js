import React, { useState ,useEffect,useReducer,useContext, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../Input.js/Input';
const emailReducer = (state,action)=>{
  if(action.type === 'USER_INPUT'){
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')}
  }
  return{value:'',isValid:false}
}
const passwordReducer = (state,action)=>{
  if(action.type === 'USER_INPUT'){
    return {value:action.val,isValid:action.val.length>6}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value:state.value, isValid:state.value.length>6}
  }
  return{value:'',isValid:false}
}
const Login = (props) => {
  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  //const[enteredCollege,setCollegeName]=useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const[passwordState,dispatchedpassword] = useReducer(passwordReducer,{
    value:'',
    isValid:null
  })
  const[emailState,disapatchemail] = useReducer(emailReducer,{
    value:'',
    isValid:null
  })
  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState;
useEffect(()=>{
  const Identifier=setTimeout(()=>{
    console.log('req send');
    
    setFormIsValid(
     emailIsValid && passwordIsValid
    )
  },100)
  return()=>{
    clearTimeout(Identifier)
  }
  
},[emailIsValid,passwordIsValid])
  const emailChangeHandler = (event) => {
    disapatchemail({type:'USER_INPUT',val:event.target.value});
  };
  // const collegeChangeHandler =(event) =>{
  //   setCollegeName(event.target.value);
  // };

  const passwordChangeHandler = (event) => {
    dispatchedpassword({type:'USER_INPUT',val:event.target.value});
  };

  const validateEmailHandler = () => {
    disapatchemail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchedpassword({type:'INPUT_BLUR'});
  };
  const emailInputRef=useRef()
  const passwordInputRef=useRef()
  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailIsValid){
      emailInputRef.current.focus();
    }
    else{
      passwordInputRef.current.focus()
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
        isValid={formIsValid}
        type='email'
        id='email'
        state={emailState.value}
        inputChangeHandler={emailChangeHandler}
        validateInputHandler={validateEmailHandler}
        />
        <Input
        ref={passwordInputRef}
        isValid={formIsValid}
        type='password'
        id='password'
        state={passwordState.value}
        inputChangeHandler={passwordChangeHandler}
        validateInputHandler={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
