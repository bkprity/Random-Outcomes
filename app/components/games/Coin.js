import React from 'react'
import { Dimensions, StyleSheet, Animated, Text, Image } from 'react-native'

import Container from '../Container'
import { coins } from '../../images'

const { width } = Dimensions.get('window')

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
      <Animated.View style={{transform: [{rotateY}]}}>
        <Image style={styles.coin} source={coins[component.state.side]} />
      </Animated.View>
    </Container>
  )

  return component
}

const styles = new StyleSheet.create({
  coin: {
    width: width * 0.6,
    height: width * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: [
      {rotateY: '0deg'}
    ]
  }
})