import React from 'react'
import { Dimensions, Animated, Easing, StyleSheet, Text, Image } from 'react-native'

import Container from '../Container'
import { russianRoulette } from '../../images'

const { width } = Dimensions.get('window')
const dim = width * 0.6

export default function RussianRoulette(props) {
  const component = new React.Component()

  const degrees = [
    0,
    1/360*60,
    1/360*120,
    1/360*180,
    1/360*240,
    1/360*300,
  ]

  component.state = {
    stage: 0,
    degrees: new Animated.Value(0)
  }

  const containerProps = {
    title: 'Russian roulette',
    btnText: 'Spin',
    btnPress: () => {
      component.setState({stage: 0})

      const pos = degrees.sort(() => 0.5 - Math.random())[0]
      const animations = [
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:   0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 500, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:   0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 800, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: 0, duration:   0, easing: Easing.linear}),
        Animated.timing(component.state.degrees, {toValue: pos, duration: 1000, easing: Easing.linear}),
      ]

      Animated.sequence(animations).start(() => component.setState({stage: 1}))
    }
  }

  const rotate = component.state.degrees.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <Animated.View style={[styles.wrapper, {transform: [{rotate}]}]}>
        <Image style={styles.cylinder} source={russianRoulette} />
      </Animated.View>

      {component.state.stage 
        ? <Text style={styles.text}>{component.state.degrees._value == 0 ? 'BANG!' : 'Click!'}</Text> 
        : null
      }
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
  cylinder: {
    position: 'absolute',
    width: dim,
    height: dim,
    left: 0,
  },
  text: {
    fontSize: width * 0.1,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})