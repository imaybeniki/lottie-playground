import React, { PureComponent } from 'react'
import Lottie from 'react-lottie'

/**
 * @summary loads the motion for the dowloaded Motorcycle animation
 * @prop {string} width of animation
 * @prop {string} height of animation
 * @prop {bool} loop if animation should continue on loop
 * @prop {autoPlay} if animation should automatically play
 */
class Motorcyle extends PureComponent {
  static defaultProps = {
    width: '100%',
    height: '100%',
    loop: true,
    autoPlay: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      isStopped: !this.props.autoPlay,
      isPaused: !this.props.autoPlay,
      isComplete: false,
    }
  }

  handleClick = () => {
    this.setState({ isPaused: !this.state.isPaused })
  }

  handleEvent = (obj) => {
    if (!this.props.loop) {
      if (obj.currentTime === (obj.totalTime - 1)) {
        if (this.state.isComplete) {
          this.setState({ isStopped: true, isComplete: false })
        } else {
          this.setState({ isStopped: false, isComplete: true })
        }
      }
    }
  }

  render() {
    const motorcycle = require('../json/motorcycle.json')

    const defaultOptions = {
      loop: this.props.loop,
      autoplay: this.props.autoPlay,
      animationData: motorcycle,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      }
    }

    // Ensures the width and heigh are valid numbers
    const makeValidNumber = (value) =>
      value.substr(value.length - 1) === '%' ? value : Number(value)

    return (
      <div className="Motorcyle">
        <Lottie
          onClick={this.handleClick}
          options={defaultOptions}
          width={makeValidNumber(this.props.width)}
          height={makeValidNumber(this.props.height)}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
          eventListeners={
            [
              {
                eventName: 'enterFrame',
                callback: obj => this.handleEvent(obj),
              },
            ]
          }
        />
      </div>
    )
  }
}

export default Motorcyle