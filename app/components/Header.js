import React          from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

const styles = new StyleSheet.create({
  header: {
    backgroundColor: '#266b9e',
    height: 60
  },
  text: {
    lineHeight: 60,
    textAlign: 'center',
    color: 'white',
    fontSize: 34,
  }
})