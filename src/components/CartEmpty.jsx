import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return ( 
    <>
      <div className='cart cart--empty'>
        <h2>
          Cart Empty
        </h2>
        <p>
          You might not have ordered pizza?
          <br />
          To order pizza, please go to the main page.
        </p>
        <img src={cartEmptyImg} alt="Emty cart" />
        <Link to='/' className='button button--black'>
          <span>Go back</span>
        </Link>
      </div>
    </>
   );
}
 
export default CartEmpty;