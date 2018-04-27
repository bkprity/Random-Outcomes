import React from 'react'
import { Dimensions, StyleSheet, Animated, Easing, Text, Image } from 'react-native'

import Container from '../Container'
import { roulette } from '../../images'

const dim = Math.floor(Dimensions.get('window').width * 0.6)

export default function Roulette(props) {
  const component = new React.Component()

  const numbers = {
    '#2bb22b': [0],
    '#c63434': [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],
    '#1f1f1f': [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]
  }

  component.state = {
    degrees: new Animated.Value(0),
    color: '#2bb22b',
    number: -1
  }

  const containerProps = {
    title: 'Roulette',
    btnText: 'Spin',
    btnPress: () => {
      component.setState({number: -1})

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
      ]

      Animated.sequence(animations).start(() => {
        const color = Object.keys(numbers).sort(() => 0.5 - Math.random())[0]
        const number = numbers[color].sort(() => 0.5 - Math.random())[0]

        component.setState({color, number})
      })
    }
  }

  const rotate = component.state.degrees.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  component.render = () => {
    const { color, number } = component.state

    return (
      <Container {...containerProps} navigation={props.navigation}>
        <Animated.View style={[styles.wrapper, {transform: [{rotate}]}]}>
          <Image style={[styles.disc, {opacity: number > -1 ? 0.9 : 1}]} source={roulette} />
          <Text style={[styles.number, {backgroundColor: color, opacity: number > -1 ? 1 : 0}]}>{number}</Text>
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
  disc: {
    position: 'absolute',
    width: dim,
    height: dim,
    left: 0,
  },
  number: {
    position: 'absolute',
    backgroundColor: '#2bb22b',
    opacity: 0,
    color: 'white',
    width: dim * 0.4,
    height: dim * 0.4,
    lineHeight: dim * 0.4,
    textAlign: 'center',
    fontSize: dim * 0.3,
    fontWeight: 'bold',
    top: dim / 2 - dim * 0.2,
    left: dim / 2 - dim * 0.2,
  }
})