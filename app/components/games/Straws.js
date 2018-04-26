import React from 'react'
import { Dimensions, StyleSheet, View, TouchableOpacity, Animated, Image } from 'react-native'

import Container from '../Container'

const { width, height } = Dimensions.get('window')

export default function Base(props) {
  const component = new React.Component()

  component.state = {
    stage: 0,
    selected: -1,
    straws: [
      new Animated.Value(width * 0.66),
      new Animated.Value(width * 0.66),
      new Animated.Value(width * 0.66),
      new Animated.Value(width * 0.66),
      new Animated.Value(width * 0.66),
      new Animated.Value(width * 0.66),
    ],
  }

  const containerProps = {
    title: 'Pick a straw',
    bottomText: 'Pick a straw',
    btnPress: () => {
      switch (component.state.stage) {
        case 1:
          component.setState({btnText: 'Try again'})

          const values = [
            0,
            width * 0.2,
            width * 0.3,
            width * 0.4,
            width * 0.5,
            width * 0.6,
          ].sort(() => 0.5 - Math.random())

          const animations = [
            Animated.timing(component.state.straws[0], {toValue: values[0],  duration: 100}),
            Animated.timing(component.state.straws[1], {toValue: values[1],  duration: 100}),
            Animated.timing(component.state.straws[2], {toValue: values[2],  duration: 100}),
            Animated.timing(component.state.straws[3], {toValue: values[3],  duration: 100}),
            Animated.timing(component.state.straws[4], {toValue: values[4],  duration: 100}),
            Animated.timing(component.state.straws[5], {toValue: values[5],  duration: 100}),
          ]

          Animated.sequence(animations).start(() => {
            component.setState({stage: 2})
          })
        break
        
        case 2: {
          Animated.timing(component.state.straws[0], {toValue: width * 0.66,  duration: 100}).start()
          Animated.timing(component.state.straws[1], {toValue: width * 0.66,  duration: 100}).start()
          Animated.timing(component.state.straws[2], {toValue: width * 0.66,  duration: 100}).start()
          Animated.timing(component.state.straws[3], {toValue: width * 0.66,  duration: 100}).start()
          Animated.timing(component.state.straws[4], {toValue: width * 0.66,  duration: 100}).start()
          Animated.timing(component.state.straws[5], {toValue: width * 0.66,  duration: 100}).start()

          component.setState({stage: 0, btnText: null, selected: -1})
        }
      }
    }
  }

  component.render = () => (
    <Container {...containerProps} btnText={component.state.btnText} navigation={props.navigation}>
      <View style={styles.wrapper}>
        {component.state.straws.map((straw, i) => (
          <TouchableOpacity 
            key={`straw-${i}-${straw}`} 
            onPress={() => 
              component.state.stage < 2 
                ? component.setState({selected: i, stage: 1, btnText: 'Reveal straws'}) 
                : null
          }>
            <Animated.View     
              style={[styles.straw, {
                top: component.state.straws[i],
                borderWidth: component.state.selected === i ? 2 : 0,
                borderColor: component.state.selected === i ? 'red' : 'transparent',
              }]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  )

  return component
}

const styles = new StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    width: width * 0.7,
    height: width * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  straw: {
    position: 'relative',
    backgroundColor: '#266b9e',
    width: width * 0.05,
    height: '100%',
    bottom: 0,
  }
})