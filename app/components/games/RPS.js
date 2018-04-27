import React from 'react'
import { Dimensions, StyleSheet, Animated, Image } from 'react-native'

import Container from '../Container'
import { rps } from '../../images'

const { width } = Dimensions.get('window')

export default function RPS(props) {
  const component = new React.Component()

  component.state = {
    hand: 0,
    degrees: new Animated.Value(0)
  }

  const containerProps = {
    title: 'Rock, Paper, Scissors',
    btnText: 'Play',
    btnPress: () => {
      component.setState({hand: 0})

      const animations = [
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 0, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 0, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 1, duration: 200}),
        Animated.timing(component.state.degrees, {toValue: 0, duration: 200}),
      ]

      Animated.sequence(animations)
        .start(() => component.setState({hand: Math.floor(Math.random() * 3)}))
    }
  }

  const rotate = component.state.degrees.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg']
  })

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <Animated.View style={{transform: [{rotate}]}}>
        <Image style={styles.hand} source={rps[component.state.hand]} />
      </Animated.View>
    </Container>
  )

  return component
}

const styles = new StyleSheet.create({
  hand: {
    width: width * 0.6,
    height: width * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})