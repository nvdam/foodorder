import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/food.jpg';
import classes from './Header.module.css';
const Header = (props) => {

  return (
    <Fragment>
      <header className={classes.header}>
        {/* <h1>FoodOrdering</h1> */}
        <button className={classes.button} onClick={props.onToogleHandler}> Your Orders </button>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
