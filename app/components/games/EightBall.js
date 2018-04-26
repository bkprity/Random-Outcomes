import React from 'react'
import { Dimensions, StyleSheet, Animated, Image } from 'react-native'

import Container from '../Container'

const graphic = require('../../assets/images/eight-ball.png')
const dim = Math.floor(Dimensions.get('window').width * 0.6)

export default function EightBall(props) {
  const component = new React.Component()

  component.state = {
    answer: 0,
    left: new Animated.Value(0)
  }
  
  const containerProps = {
    title: '8 ball',
    btnText: 'Shake',
    btnPress: () => {
      component.setState({ answer: 0 })

      const animations = [
        Animated.timing(component.state.left, {toValue: 20,  duration: 100}),
        Animated.timing(component.state.left, {toValue: -20, duration: 100}),
        Animated.timing(component.state.left, {toValue: 20,  duration: 100}),
        Animated.timing(component.state.left, {toValue: 0,   duration: 100}),
      ]

      Animated.sequence(animations)
        .start(() => component.setState({ answer: Math.ceil(Math.random() * 11) }))
    }
  }

  component.render = () => {
    const { left } = component.state

    return (
      <Container {...containerProps} navigation={props.navigation}>
        <Animated.View style={[styles.wrapper, {left}]}>
          <Image 
            style={[styles.eightBall, {left: -Math.abs(dim * component.state.answer)}]}
            resizeMethod="resize"
            removeClippedSubviews={true}
            source={graphic}
          />
        </Animated.View>
      </Container>
    )
  }

  return component
}

const styles = new StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: 'transparent',
    width: dim,
    height: dim,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eightBall: {
    position: 'absolute',
    width: dim * 12 ,
    height: dim,
    left: 0,
  }
})