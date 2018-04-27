import React from 'react'
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { AdMobInterstitial } from 'react-native-admob'

import Header from './Header'
import BannerAd from './BannerAd'
import { icons } from '../images'

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
          
            <Image style={styles.icon} source={item.icon} />

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
    icon: icons.die,
  },
  {
    title: 'Pick a card',
    id: 'Cards',
    icon: icons.cards,
  },
  {
    title: 'Flip a coin',
    id: 'Coin',
    icon: icons.coins,
  },
  {
    title: '8 ball',
    id: 'EightBall',
    icon: icons.eightBall,
  },
  {
    title: 'Spin the bottle',
    id: 'Bottle',
    icon: icons.bottle,
  },
  {
    title: 'Pick a straw',
    id: 'Straws',
    icon: icons.straws,
  },
  {
    title: 'Rock, Paper, Scissors',
    id: 'RPS',
    icon: icons.rps,
  },
  {
    title: 'Roulette',
    id: 'Roulette',
    icon: icons.roulette,
  },
  {
    title: 'Spin the wheel',
    id: 'Wheel',
    icon: icons.wheel,
  },
  {
    title: 'Random number',
    id: 'RandomNumber',
    icon: icons.number,
  },
  {
    title: 'Three cups',
    id: 'ThreeCups',
    icon: icons.cups,
  },
  {
    title: 'Russian roulette',
    id: 'RussianRoulette',
    icon: icons.russianRoulette,
  },
]

const styles = new StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: width * 0.025,
  },
  item: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: width * 0.025,
    width: width * 0.29,
    height: width * 0.29,
    marginBottom: width * 0.025,
  },
  icon: {
    width: width * 0.15,
    height: width * 0.15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: width * 0.023,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-end',
    color: 'black',
  }
})