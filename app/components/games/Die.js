import React from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'

import Container from '../Container'
import { die } from '../../images'

const { width } = Dimensions.get('window')

export default function Die(props) {
  const component = new React.Component()

  component.state = {
    face: die[5]
  }

  const containerProps = {
    title: 'Roll a die',
    btnText: 'Roll die',
    btnPress: () => component.setState({face: die[Math.floor(Math.random() * 6)]})
  }

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
        <Image style={styles.die} source={component.state.face} />
    </Container>
  )

  return component
}

const styles = new StyleSheet.create({
  die: {
    width: width * 0.6,
    height: width * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})