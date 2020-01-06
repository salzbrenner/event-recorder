import React from 'react';

class Ripple extends React.Component {
  static monitoredEvents = [
    'mousedown',
    'mousemove',
    'mouseup',
    'touchstart',
    'touchmove',
    'touchend',
    'animationend',
  ];

  state = {
    x: 0,
    y: 0,
    isDragging: false,
    isVisible: false,
    currentAnimation: 'start-animation',
    isAnimating: false,
  };

  constructor(props) {
    super(props);
    this.animateRipple = this.animateRipple.bind(this);
  }

  addKeyframes() {
    const stylesheet = document.createElement('style');
    const keyFrames = `@keyframes start-animation {
      from {
        transform: scale(0.7);
        opacity: 0.2;
      }
      to {
        transform: scale(1);
        opacity: 0.6;
      }
    }
  
      @keyframes end-animation {
      from {
        transform: scale(1);
        opacity: 0.6;
      }
      to {
        transform: scale(1.3);
        opacity: 0.2;
      }
     }
  `;

    stylesheet.innerHTML = keyFrames;
    document.body.prepend(stylesheet);
  }

  componentDidMount() {
    this.addKeyframes();
    Ripple.monitoredEvents.forEach(event =>
      window.addEventListener(event, this.animateRipple, {
        passive: false,
      })
    );
  }

  componentWillUnmount() {
    Ripple.monitoredEvents.forEach(event =>
      window.removeEventListener(event, this.animateRipple)
    );
  }

  animateRipple(e) {
    const { pageX, pageY } =
      (e.touches && e.touches[0]) ||
      (e.changedTouches && e.changedTouches[0]) ||
      e;
    const event = e.type;

    // if (event === 'touchend' || event === 'touchstart') {
    //   e.preventDefault();
    // }

    if (event === 'mousemove' || event === 'touchmove') {
      if (this.state.isDragging) {
        this.setState({
          x: pageX,
          y: pageY,
        });
      }
    } else if (
      event === 'mouseup' ||
      event === 'touchend'
    ) {
      this.setState({
        isDragging: false,
        currentAnimation: 'end-animation',
      });
    } else if (
      event === 'mousedown' ||
      event === 'touchstart'
    ) {
      this.setState({
        currentAnimation: 'start-animation',
        isDragging: true,
        isVisible: true,
        isAnimating: true,
        x: pageX,
        y: pageY,
      });
    } else if (event === 'animationend') {
      if (this.state.isVisible && this.state.isDragging) {
        this.setState({
          isAnimating: false,
        });
      } else {
        this.setState({
          isAnimating: false,
          isVisible: false,
        });
      }
    }
  }

  render() {
    const {
      x,
      y,
      isVisible,
      currentAnimation,
    } = this.state;

    const styles = {
      display: isVisible ? 'block' : 'none',
      position: 'absolute',
      top: y,
      left: x,
      width: 50,
      height: 50,
      marginLeft: -(50 / 2),
      marginTop: -(50 / 2),
      background: 'rgb(135,206,250, 0.5)',
      border: 'solid 3px lightskyblue',
      borderRadius: '50%',
      animationName: currentAnimation,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.2s',
      animationDelay: '0.0s',
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'forwards',
      zIndex: 1000,
      pointerEvents: 'none',
    };

    return <div style={styles} />;
  }
}

export default Ripple;
