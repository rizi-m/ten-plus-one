// Taken from https://codesandbox.io/s/76gli?file=/src/auto.js

import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

export default class Auto extends Component {
  state = {
    contentToggle: false,
    height: 'auto',
  };

  componentDidMount() {
    this.setFixedHeight();
  }

  componentDidUpdate(prevProps, prevState, prevHeight) {
    const { children } = this.props;

    if (prevProps.children !== children) {
      this.setState({
        height: 'auto',
      });
    }
  }

  setFixedHeight = () => {
    this.setState({
      height: document.querySelector('.Auto').clientHeight,
    });
  };

  render() {
    const { height } = this.state;
    const { children } = this.props;
    return (
      <AnimateHeight
        height={height}
        onAnimationEnd={this.setFixedHeight}
        className='Auto'
      >
        {children}
      </AnimateHeight>
    );
  }
}
