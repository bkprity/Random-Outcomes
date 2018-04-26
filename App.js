/**
 * Random Outcomes
 * https://github.com/kniffen/Random-Outcomes
 * Author: @Kniffen
 * Licence: MIT
 */

import React, { Component } from 'react'
import { StackNavigator }   from 'react-navigation'

const Navigation = StackNavigator(
  {
    Home:            { screen: require('./app/components/Home').default },
    Die:             { screen: require('./app/components/games/Die').default },
    Cards:           { screen: require('./app/components/games/Cards').default },
    Coin:            { screen: require('./app/components/games/Coin').default },
    EightBall:       { screen: require('./app/components/games/EightBall').default },
    Bottle:          { screen: require('./app/components/games/Bottle').default },
    Straws:          { screen: require('./app/components/games/Straws').default },
    RPS:             { screen: require('./app/components/games/RPS').default },
    Roulette:        { screen: require('./app/components/games/Roulette').default },
    Wheel:           { screen: require('./app/components/games/Wheel').default },
    RandomNumber:    { screen: require('./app/components/games/RandomNumber').default },
    ThreeCups:       { screen: require('./app/components/games/ThreeCups').default },
    RussianRoulette: { screen: require('./app/components/games/RussianRoulette').default },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
)

export default function App() {
  return (
    <Navigation />
  )
}