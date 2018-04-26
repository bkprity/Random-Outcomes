import React from 'react'
import { Dimensions, StyleSheet, Animated, Image } from 'react-native'

import Container from '../Container'

const graphic = require('../../assets/images/rps.png')
const dim = Math.floor(Dimensions.get('window').width * 0.6)

export default function RPS(props) {
  const component = new React.Component()

  component.state = {
    degrees: new Animated.Value(0),
    left: 0
  }

  const containerProps = {
    title: 'Rock, Paper, Scissors',
    btnText: 'Play',
    btnPress: () => {
      component.setState({left: 0})

      const animations = [
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 0, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 0, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 0, duration: 200}),
      ]

      Animated.sequence(animations)
        .start(() => component.setState({left: Math.floor(Math.random() * 3)}))
    }
  }

  const rotate = component.state.degrees.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg']
  })

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <Animated.View style={[styles.wrapper, {transform: [{rotate}]}]}>
        <Image style={[styles.hand, {left: -Math.abs(dim * component.state.left)}]} source={graphic} />
      </Animated.View>
    </Container>
  )

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
  hand: {
    position: 'absolute',
    width: dim * 3,
    height: dim,
    left: 0,
  }
})