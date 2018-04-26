import React from 'react'
import { Dimensions, View, Text, TextInput, StyleSheet } from 'react-native'

import Container from '../Container'

const { width } = Dimensions.get('window')

export default function RandomNumber(props) {
  const component = new React.Component()

  component.state = {
    stage: 0,
    number: 0,
    min: 0,
    max: 100,
  }

  const containerProps = {
    title: 'Random number',
    btnText: 'Generate',
    btnPress: () => {
      const { min, max } = component.state
      component.setState({number: Math.floor(Math.random() * (max+1 - min) + min)})
    }
  }

  component.render = () => (
    <Container {...containerProps} navigation={props.navigation}>
      <View style={styles.minmax}>
        <View style={styles.inputWrapper}>
          <Text style={{textAlign: 'center'}}>Min</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            onChangeText={text => 
              component.setState({min: text ? parseInt(text.match(/[0-9]/g).join('')) : 0})
            }
            onSubmitEditing={text => {
              const { min, max } = component.state
              component.setState({max: min >= max ? min+1 : max})
            }}
            value={component.state.min.toString()}
            maxLength={5}
          />
        </View>
        
        <View style={styles.inputWrapper}>
          <Text style={{textAlign: 'center'}}>Max</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            onChangeText={text => 
              component.setState({max: text ? parseInt(text.match(/[0-9]/g).join('')) : 0})
            }
            onSubmitEditing={text => {
              let { min, max } = component.state

              if (max <= 0) max = 1
              if (min >= max) min = max - 1

              component.setState({min, max})
            }}
            value={component.state.max.toString()}
            maxLength={5}
          />
        </View>
      </View>

      <Text style={styles.number}>{component.state.number}</Text>
    </Container>
  )

  return component
}

const styles = new StyleSheet.create({
  minmax: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.1,
  },
  inputWrapper: {
    width: width * 0.3,
  },
  input: {
    textAlign: 'center',
    fontSize: width * 0.06,
  },
  number: {
    fontSize: width * 0.3,
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})