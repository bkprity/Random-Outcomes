import React from 'react'
import { Dimensions, StyleSheet, View, Text, Animated, Image } from 'react-native'

import Container from '../Container'
import { cup } from '../../images'

const { width, height } = Dimensions.get('window')
const dim = width * 0.3

export default function ThreeCups(props) {
  const component = new React.Component()

  component.state = {
    stage: 0,
    ballPos: 1,
    top: new Animated.Value(height * 0.05),
    left: new Animated.Value(0),
  }

  const containerProps = {
    title: 'Three cups',
    btnPress: () => {
      switch (component.state.stage) {
        case 0:
          Animated.timing(component.state.top, {toValue: height * 0.25, duration: 100}).start()

          const animations = [
            Animated.timing(component.state.left, {toValue: 10,  duration: 100}),
            Animated.timing(component.state.left, {toValue: -10, duration: 100}),
            Animated.timing(component.state.left, {toValue: 10,  duration: 100}),
            Animated.timing(component.state.left, {toValue: -10, duration: 100}),
            Animated.timing(component.state.left, {toValue: 10,  duration: 100}),
            Animated.timing(component.state.left, {toValue: -10, duration: 100}),
            Animated.timing(component.state.left, {toValue: 0,   duration: 100}),
          ]

          Animated.sequence(animations).start(() => {
            component.setState({
              stage: 1,
              ballPos: Math.floor(Math.random() * 3),
            })
          })
          break

        case 1:
          Animated.timing(component.state.top, {toValue: height * 0.05, duration: 100})
            .start(() => component.setState({stage: 0}))
          break
      }
    }
  }

  component.render = () => {
    const { stage, top, left, ballPos } = component.state

    return (
      <Container {...containerProps} btnText={stage ? 'Reveal' : 'Shake'} navigation={props.navigation}>
        <Animated.View style={[styles.cups, {top, left}]}>
          <Image style={styles.cup} source={cup} />
          <Image style={styles.cup} source={cup} />
          <Image style={styles.cup} source={cup} />
        </Animated.View>
        <View style={[styles.ball, {left: dim / 2 + dim * ballPos - width * 0.05}]} />
      </Container>
    )
  }

  return component
}

const styles = new StyleSheet.create({
  cups: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: dim * 3,
    zIndex: 10,
  },
  cup: {
    width: dim,
    height: dim,
  },
  ball: {
    position: 'absolute',
    backgroundColor: '#c63434',
    borderWidth: 3,
    borderColor: 'black',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 100,
    top: height * 0.4,
  }
})