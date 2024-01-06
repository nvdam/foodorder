import { useEffect, useState } from 'react';
import useCheckout from '../../hooks/CheckoutForm';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const { value: enteredName,
         inValid: nameHasError,
          inputChangeHandler: nameChangeHandler,
           inputBlurHandler: nameBlurHandler,
           valid: nameIsValid,
           reset: nameReset,
        } = useCheckout( value => value.trim() !== '');
        const { value: enteredMobileNumber,
            inValid: mobileNumberHasError,
             inputChangeHandler: mobileNumberChangeHandler,
              inputBlurHandler: mobileNumerBlurHandler,
              valid: mobileNumberIsValid,
              reset: mobileNumberReset,
           } = useCheckout( value => value.trim() > 100);

           const { value: enteredAddress,
            inValid: addressHasError,
             inputChangeHandler: addressChangeHandler,
              inputBlurHandler: addressBlurHandler,
              valid: addressIsValid,
              reset: addressReset,
           } = useCheckout( value => value.trim() !== '');

           const { value: enteredPostalCode,
            inValid: postalCodeHasError,
             inputChangeHandler: postalCodeChangeHandler,
              inputBlurHandler: postalCodeBlurHandler,
              valid: postalCodeIsValid,
              reset: postalCodeReset,
           } = useCheckout( value => value.trim().length === 3);

    const checkoutSubmitHandler = (event) => {
        event.preventDefault();
        if(nameIsValid && mobileNumberIsValid && addressIsValid){
            props.onCheckout({
                name: enteredName,
                mobile: enteredMobileNumber,
                address: enteredAddress,
                postal: enteredPostalCode
            });
            nameReset();
            mobileNumberReset();
            addressReset();
            postalCodeReset();

        }

    }

    
useEffect(() => {
    if(nameIsValid && mobileNumberIsValid && addressIsValid && postalCodeIsValid )
    {
        setFormIsValid(true);
    }else{
        setFormIsValid(false);
    }
},[nameIsValid, mobileNumberIsValid, addressIsValid, postalCodeIsValid]);
    // const nameInputClass = hasError ? 'control invalid' : 'control';
    return(
        <form className={classes.form} onSubmit={checkoutSubmitHandler}> 
        <div className={classes.control}> 
            <label htmlFor="name"> Name: </label>
            <input
             type="text"
            onChange = {nameChangeHandler}
            onBlur = {nameBlurHandler}
            value={enteredName}
             />
             {nameHasError && <p className={classes.errortext}> Enter Valid Name!!!</p>}
        </div>
       <div className={classes.control}> 
            <label htmlFor="number"> Mobile Number: </label>
            <input 
            type="number"
            onChange={mobileNumberChangeHandler}
            onBlur={mobileNumerBlurHandler}
            value={enteredMobileNumber}
            />
            {mobileNumberHasError && <p className={classes.errortext}> Enter Valid Mobile Number!!!</p>}
        </div>
        <div className={classes.control}> 
            <label htmlFor="address"> Address: </label>
            <input
             type="textarea"
             onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            value={enteredAddress}
              />
              {addressHasError && <p className={classes.errortext}> Enter Valid Address!!!</p>}
        </div>
        <div className={classes.control}> 
            <label htmlFor="postalcode"> PostalCode: </label>
            <input
             type="text"
             onChange={postalCodeChangeHandler}
             onBlur={postalCodeBlurHandler}
             value={enteredPostalCode}
              />
               {postalCodeHasError && <p className={classes.errortext}> Enter Valid PostalCode!!!</p>}
        </div>
        <div className={classes.actions}>
            <button
             type="button" 
             onClick={props.onCancel}
             > Cancel Order</button>

            {formIsValid && <button> Checkout </button>}
            </div>

        </form>

)
}
export default Checkout;