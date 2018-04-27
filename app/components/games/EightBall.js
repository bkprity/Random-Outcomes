import React from 'react'
import { Dimensions, StyleSheet, Animated, Image } from 'react-native'

import Container from '../Container'
import { eightBall } from '../../images'

const { width } = Dimensions.get('window')

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
    const { answer, left } = component.state

    return (
      <Container {...containerProps} navigation={props.navigation}>
        <Animated.View style={{left}}>
          <Image 
            style={styles.eightBall}
            source={eightBall[answer]}
          />
        </Animated.View>
      </Container>
    )
  }

  return component
}

const styles = new StyleSheet.create({
  eightBall: {
    width: width * 0.6,
    height: width * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})