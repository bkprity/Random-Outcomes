import React from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'

import Container from '../Container'

const graphic = require('../../assets/images/cards.png')
const { width, height } = Dimensions.get('window')
const cardWidth = width * 0.5
const cardHeight = cardWidth / 320 * 450

export default function Die(props) {
  const component = new React.Component()
  
  component.state = {
    cardCoords: {
      top: 0,
      left: 0
    }
  }

  const containerProps = {
    title: 'Pick a card',
    btnText: 'Shuffle',
    btnPress: () => {
      component.setState({
        cardCoords: {
          top:  -Math.abs(cardHeight * Math.floor((Math. random() *  4))),
          left: -Math.abs(cardWidth * Math.floor((Math. random() * 13)))
        }
      })
    }
  }

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <View style={styles.wrapper}>
        <Image 
          style={[styles.card, component.state.cardCoords]} 
          resizeMethod="resize"
          removeClippedSubviews={true}
          source={graphic}
        />
      </View>
    </Container>
  )

  return component
}

const styles = new StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: 'transparent',
    width: cardWidth,
    height: cardHeight,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    position: 'absolute',
    width: cardWidth * 13,
    height: cardHeight * 4,
    top: 0,
    left: 0,
  }
})