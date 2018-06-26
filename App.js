/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabBarComponent from './pages/TabBar';
import { Navigator } from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Navigator
        initialRoute={{
          component: TabBarComponent,
          params:{
            selectedTab: '首页'
          }
        }}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump
        }
        renderScene={(route, navigator) => {
          let Component = route.component;
          return (
            <Component {...route.params} navigator={navigator} />
          );
        }
        }
      />
    );
  }
}
