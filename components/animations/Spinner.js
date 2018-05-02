import React, { Component } from 'react';
import styles from './Spinner.css';


class Spinner extends Component {
 

  render() {
  	return (
      <div className={styles.spinner}>
        <div className={styles.doubleBounce1}></div>
        <div className={styles.doubleBounce2}></div>
      </div>
      )
  }
}


export default Spinner;