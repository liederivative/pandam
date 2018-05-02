// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/menu">Menu</Link>
          </div>

          <Link to="/counter">to Counter</Link>
          <div>
            <Link to="/print ">Print</Link>
          </div>
          <div>
            <Link to="/menu/users ">Users</Link>
          </div>
        </div>
      </div>
    );
  }
}
