import React from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'

import Container from '../Container'

const graphic = require('../../assets/images/die.png')
const dim = Dimensions.get('window').width * 0.6

export default function Die(props) {
  const component = new React.Component()

  component.state = {
    face: 5
  }

  const containerProps = {
    title: 'Roll a die',
    btnText: 'Roll die',
    btnPress: () => component.setState({face: Math.floor(Math.random() * 6)})
  }

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <View style={styles.wrapper}>
        <Image style={[styles.die, {left: -Math.abs(dim * component.state.face)}]} source={graphic} />
      </View>
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
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  die: {
    position: 'absolute',
    width: dim * 6,
    height: dim
  }
})