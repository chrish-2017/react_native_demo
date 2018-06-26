import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import HomeComponent from './Index';
import CartComponent from './Cart';
import MineComponent from './Mine';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.selectedTab
    }
  }

  render() {
    let tabBarInfo = [
      {
        name: "首页",
        icon: require('./../images/home.png'),
        selectedIcon: require('./../images/selectedHome.png'),
        component: <HomeComponent navigator={this.props.navigator}/>
      },
      {
        name: "购物车",
        icon: require('./../images/cart.png'),
        selectedIcon: require('./../images/selectedCart.png'),
        component: <CartComponent navigator={this.props.navigator}/>
      },
      {
        name: "我的",
        icon: require('./../images/mine.png'),
        selectedIcon: require('./../images/selectedMine.png'),
        component: <MineComponent navigator={this.props.navigator} initialPage={this.props.initialPage}/>
      }
    ];
    return (
      <View style={styles.container}>
        <TabNavigator>
          {tabBarInfo.map((item, index) =>
            <TabNavigator.Item
              key={index}
              selected={this.state.selectedTab == item.name}
              title={item.name}
              titleStyle={styles.tabText}
              selectedTitleStyle={styles.selectedTabText}
              renderIcon={() => <Image style={styles.icon} source={item.icon}/>}
              renderSelectedIcon={() => <Image style={styles.icon} source={item.selectedIcon}/>}
              onPress={() => this.setState({ selectedTab: item.name })}>
              {item.component}
            </TabNavigator.Item>
          )}
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabText: {
    color: '#999',
    fontSize: 13
  },
  selectedTabText: {
    color: '#000'
  },
  icon: {
    width: 20,
    height: 20
  }
});
