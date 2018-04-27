import React from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'

import Container from '../Container'
import { cards } from '../../images'

const { width } = Dimensions.get('window')

export default function Die(props) {
  const component = new React.Component()
  
  component.state = {
    suit: 0,
    value: 0
  }

  const containerProps = {
    title: 'Pick a card',
    btnText: 'Shuffle',
    btnPress: () => {
      component.setState({
          suit:  Math.floor(Math. random() *  4),
          value: Math.floor(Math. random() * 13)
      })
    }
  }


  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <Image 
        style={styles.card} 
        onError={err => console.log('image error!!!!!!!!!')}
        source={cards[component.state.suit][component.state.value]}
      />
    </Container>
  )

  return component
}

const styles = new StyleSheet.create({
  card: {
    width: width * 0.5,
    height: (width * 0.5) / 320 * 450,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})