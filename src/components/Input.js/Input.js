import React, { useRef ,useImperativeHandle,} from'react';
import classes from '../Login/Login.module.css'
const Input = React.forwardRef((props,ref)=>{
    const InputRef=useRef();
   
    const activate=(()=>{
    InputRef.current.focus();
    })
    useImperativeHandle(ref,()=>{
        return{
            focus:activate
        }
       
    }
   
    )
   
    return(
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.type}>{props.type}</label>
          <input
            ref={InputRef}
            type={props.type}
            id={props.id}
            value={props.state}
            onChange={props.inputChangeHandler}
            onBlur={props.validateInputHandler}
          />
        </div>
        
       
    )
})
export default Input;