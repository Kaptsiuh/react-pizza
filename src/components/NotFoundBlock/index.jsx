import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return ( 
    <div className={styles.root}>
      <h1> 
        <span>&#128543;</span>
        <br />
        Not Found 
      </h1>
      <p></p>
    </div>
   );
}
 
export default NotFoundBlock;