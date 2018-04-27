import React from 'react'
import { AdMobBanner } from 'react-native-admob'

const adverts = require('../adverts.json')

export default function BannerAd() {
  return (
    <AdMobBanner
      style={{
        marginLeft: 'auto', 
        marginRight: 'auto',
        marginTop: 20,
      }}
      adSize="banner"
      adUnitID={adverts.banner}
      testDeviceId={AdMobBanner.simulatorId}
      onAdFailedToLoad={err => console.log(err)}
    />
  )
}