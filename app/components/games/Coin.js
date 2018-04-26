import React from 'react'
import { Dimensions, StyleSheet, Animated, Text, Image } from 'react-native'

import Container from '../Container'

const graphic = require('../../assets/images/coins.png')
const dim = Math.floor(Dimensions.get('window').width * 0.65)

export default function Coin(props) {
  const component = new React.Component()

  component.state = {
    side: 0,
    degrees: new Animated.Value(0)
  }

  const anime = (target, opts) => {
    return new Promise(resolve => {
      Animated.timing(target, opts).start(() => resolve())
    })
  }

  const containerProps = {
    title: 'Flip a coin',
    btnText: 'Flip',
    btnPress: async () => {
      const duration = 100

      await anime(component.state.degrees, {toValue: 1, duration})
      component.setState({side: 1})
      await anime(component.state.degrees, {toValue: 0, duration})
      await anime(component.state.degrees, {toValue: 1, duration})
      component.setState({side: 0})
      await anime(component.state.degrees, {toValue: 0, duration})
      await anime(component.state.degrees, {toValue: 1, duration})
      component.setState({side: 1})
      await anime(component.state.degrees, {toValue: 0, duration})

      if (Math.floor(Math.random() * 2)) {
        await anime(component.state.degrees, {toValue: 1, duration})
        component.setState({side: 0})
        await anime(component.state.degrees, {toValue: 0, duration})
      }
    }
  }

  const rotateY = component.state.degrees.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  })

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <Animated.View style={[styles.wrapper, {transform: [{rotateY}]}]}>
        <Image style={[styles.coin, {left: -Math.abs(dim * component.state.side)}]} source={graphic} />
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
    transform: [
      {rotateY: '45deg'}
    ]
  },
  coin: {
    position: 'absolute',
    width: dim * 2,
    height: dim,
    left: 0,
  }
})