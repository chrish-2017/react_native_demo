import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeComponent from './pages/Index';
import CartComponent from './pages/Cart';
import MineComponent from './pages/Mine';
import GoodsListComponent from './pages/GoodsList';
import GoodsDetailComponent from './pages/GoodsDetail';
import PayComponent from './pages/Pay';
import AddressComponent from './pages/Address';

const HomeStack = createBottomTabNavigator(
  {
    Home: HomeComponent,
    Cart: CartComponent,
    Mine: MineComponent
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Cart') {
          iconName = `ios-cart${focused ? '' : '-outline'}`;
        } else if (routeName === 'Mine') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={20} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey'
    }
  }
);

export default createStackNavigator(
  {
    Home: HomeStack,
    List: GoodsListComponent,
    Detail: GoodsDetailComponent,
    Pay: PayComponent,
    Address: AddressComponent
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);
