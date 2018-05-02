// @flow
import React, { Component } from 'react';
import Home from '../components/Home.jsx';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
  	console.log(this.props,'Home')
    return (
      <Home />
    );
  }
}
