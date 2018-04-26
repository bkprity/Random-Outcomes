import React from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'

import Header from './Header'
import BannerAd from './BannerAd'

const { width, height } = Dimensions.get('window')

export default function Container(props) {
  return (
    <View>
      <Header title={props.title}/>
    
      <View style={styles.container}>
        {props.children}
      
        {props.btnText
          ? (
            <TouchableOpacity style={styles.btn} onPress={props.btnPress}>
              <Text style={styles.btnText}>{props.btnText}</Text>
            </TouchableOpacity>
          )
          : (
            <Text style={styles.bottomText}>{props.bottomText}</Text>
          )
        }
      </View>

      <Text style={styles.backBtn} onPress={() => props.navigation.navigate('Home')}>Back</Text>

      <BannerAd />
    </View>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: height * 0.65,
    margin: width * 0.03,
    paddingVertical: 40
  },
  btn: {
    backgroundColor: '#266b9e',
    width: width * 0.5,
    height: width * 0.1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnText: {
    fontSize: width * 0.06,
    color: 'white',
    textAlign: 'center',
    lineHeight: width * 0.1,
  },
  backBtn: {
    fontSize: width * 0.04,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bottomText: {
    fontSize: width * 0.04,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 50,
  }
}