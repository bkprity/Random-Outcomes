import React from 'react'
import { Dimensions, View, Animated, StyleSheet, Easing, Image } from 'react-native'

import Container from '../Container'
import { wheel } from '../../images'

const { width } = Dimensions.get('window')
const dim = Math.floor(width * 0.6)

export default function Wheel(props) {
  const component = new React.Component()

  component.state = {
    degrees: new Animated.Value(0)
  }

  const containerProps = {
    title: 'Spin the wheel',
    btnText: 'Spin',
    btnPress: () => {
      Animated.timing(component.state.degrees, {toValue: 0, duration:  200, easing: Easing.linear})

      const animations = [
        Animated.timing(component.state.degrees, {toValue: 1, duration:  200, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:    0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 1, duration:  400, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:    0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 1, duration:  600, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:    0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 1, duration:  800, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:    0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: Math.random() * 1, duration:    0, easing: Easing.linear}),
      ]

      Animated.sequence(animations).start()
    }
  }

  const rotate = component.state.degrees.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <View style={styles.triangle}/>

      <Animated.View style={[styles.wrapper, {transform: [{rotate}]}]}>
        <Image style={styles.wheel} source={wheel} />
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
  wheel: {
    position: 'absolute',
    width: dim,
    height: dim,
    left: 0,
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 30,
    zIndex: 10,
    left: (width - width * 0.06) / 2 - 10,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 20,
    borderTopColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})