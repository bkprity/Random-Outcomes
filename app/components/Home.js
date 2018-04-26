import React from 'react'
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { AdMobInterstitial } from 'react-native-admob'

import Header from './Header'
import BannerAd from './BannerAd'

const icons = require('../assets/images/icons.png')
const { width } = Dimensions.get('window')
const adverts = require('../adverts.json')

AdMobInterstitial.setAdUnitID(adverts.interstitial)
AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId])

export default function Home(props) {
  return (
    <View>
      <Header title="Random outcomes" />

      <View style={styles.container}>
        {items.map((item, i) => (
          <TouchableOpacity  
          key={`nav-item-${item.id}`}
            onPress={() => {
              props.navigation.navigate(item.id)
              AdMobInterstitial.requestAd()
                .then(() => Math.random() * 5 < 1 ? AdMobInterstitial.showAd() : null)
                .catch(err => console.log(err))
            }}
            style={styles.item}
          >
          
            <View style={styles.iconWrapper}>
              <Image 
                style={[styles.icon, {left: -Math.abs(iconDim * i)}]} 
                source={icons}
              />
            </View>

            <Text style={styles.title} onPress={() => props.navigation.navigate(item.id)}>{item.title}</Text>
          
          </TouchableOpacity >
        ))}
      </View>

      <BannerAd />
    </View>
  )
}

const items = [
  {
    title: 'Roll a die',
    id: 'Die',
  },
  {
    title: 'Pick a card',
    id: 'Cards',
  },
  {
    title: 'Flip a coin',
    id: 'Coin',
  },
  {
    title: '8 ball',
    id: 'EightBall',
  },
  {
    title: 'Spin the bottle',
    id: 'Bottle',
  },
  {
    title: 'Pick a straw',
    id: 'Straws',
  },
  {
    title: 'Rock, Paper, Scissors',
    id: 'RPS',
  },
  {
    title: 'Roulette',
    id: 'Roulette',
  },
  {
    title: 'Spin the wheel',
    id: 'Wheel',
  },
  {
    title: 'Random number',
    id: 'RandomNumber',
  },
  {
    title: 'Three cups',
    id: 'ThreeCups',
  },
  {
    title: 'Russian roulette',
    id: 'RussianRoulette',
  },
]

const itemDim = width * 0.29
const iconDim = width * 0.15
const margin = width * 0.025

const styles = new StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin,
  },
  item: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: margin,
    width: itemDim,
    height: itemDim,
    marginBottom: margin,
  },
  iconWrapper: {
    position: 'relative',
    backgroundColor: 'transparent',
    width: iconDim,
    height: iconDim,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon: {
    position: 'absolute',
    width: iconDim * items.length,
    height: iconDim,
    top: 0,
    left: 0,
  },
  title: {
    fontSize: width * 0.023,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-end',
    color: 'black',
  }
})