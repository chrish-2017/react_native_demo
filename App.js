/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RootStack from './Navigator';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(
  [
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader'
  ]
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <RootStack />;
  }
}
