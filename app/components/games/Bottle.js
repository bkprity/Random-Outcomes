import React from 'react'
import { Dimensions, StyleSheet, Animated, Easing, Image } from 'react-native'

import Container from '../Container'
import { bottle } from '../../images'

const dim = Math.floor(Dimensions.get('window').width * 0.6)

export default function Bottle(props) {
  const component = new React.Component()

  component.state = {
    degrees: new Animated.Value(0)
  }

  const containerProps = {
    title: 'Spin the bottle',
    btnText: 'Spin',
    btnPress: () => {
      Animated.timing(component.state.degrees, {toValue: 0, duration: 200, easing: Easing.linear})

      const animations = [
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:   0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 500, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:   0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 800, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:   0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: Math.random() * 1, duration: 1000, easing: Easing.linear}),
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
      <Animated.View style={[styles.wrapper, {transform: [{rotate}]}]}>
        <Image style={styles.bottle} source={bottle} />
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
  bottle: {
    position: 'absolute',
    width: dim,
    height: dim,
    left: 0,
  }
})