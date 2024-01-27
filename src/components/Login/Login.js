import React, { useState ,useEffect,useReducer,useContext} from 'react';

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
  },500)
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

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        emailState={emailState} 
        emailChangeHandler={emailChangeHandler} 
        validateEmailHandler={validateEmailHandler}
        passwordState={passwordState}
        passwordChangeHandler={passwordChangeHandler}
        validatePasswordHandler={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
