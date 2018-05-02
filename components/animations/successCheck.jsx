// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import style from './SuccessCheck.css';


export default class SuccessCheck extends Component {

  render() {

    return (
        <div className={style.check_mark}>
          <div className={classNames(style.saIcon,style.saSuccess,style.animate)} >
            <span className={classNames(style.saLine,style.saTip,style.animateSuccessTip)} ></span>
            <span className={classNames(style.saLine,style.saLong,style.animateSuccessLong)}></span>
            <div className={style.saPlaceholder}></div>
            <div className={style.saFix}></div>
          </div>
        </div>
    );
  }
}
