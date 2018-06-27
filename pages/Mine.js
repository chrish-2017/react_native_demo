import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const orderInfo = [ {
  no: "123456789",
  status: "已发货",
  goodsList: [
    { image: require('./../images/goods.jpg'), name: "双肩背包", tag: "春季新品", price: "39.00", number: 1 },
    { image: require('./../images/goods.jpg'), name: "双肩背包", tag: "春季新品", price: "39.00", number: 1 }
  ]
} ];
const addressInfo = [
  { name: "邹凌", phone: "18380447856", address: "成都高新区天府软件园" },
  { name: "邹凌", phone: "18380447856", address: "成都高新区天府软件园" }
];
export default class MineComponent extends Component {

  static navigationOptions = {
    title: '我的'
  };

  toAddress() {
    this.props.navigation.navigate('Address');
  }

  render() {
    return (
      <ScrollableTabView
        tabBarPosition='top'
        initialPage={this.props.initialPage}
        renderTabBar={() => <DefaultTabBar/>}
        tabBarBackgroundColor="#fff"
        tabBarActiveTextColor="#f44336"
        tabBarInactiveTextColor="#666"
        tabBarTextStyle={{ fontWeight: 'normal' }}
        tabBarUnderlineStyle={{ height: 2, backgroundColor: '#f44336' }}
      >
        <View tabLabel='我的订单'>
          <View style={styles.orderList}>
            {orderInfo.map((item, index) =>
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderInfo}>
                  <Text>订单编号 {item.no}</Text>
                  <Text>{item.status}</Text>
                </View>
                {item.goodsList.map((item, index) =>
                  <View key={index} style={styles.orderDetail}>
                    <Image style={styles.goodsImage} source={item.image}/>
                    <View style={styles.orderDescribe}>
                      <Text>{item.name}</Text>
                      <Text>{item.tag}</Text>
                      <View style={styles.orderCount}>
                        <Text>￥{item.price}</Text>
                        <Text>×{item.number}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
          <View style={styles.orderTotal}>
            <Text>共2件商品 小计：￥78</Text>
          </View>
          <View style={styles.buttonGroup}>
            <Text style={styles.button}>确认收货</Text>
          </View>
        </View>
        <View tabLabel='地址管理'>
          <View style={styles.addressList}>
            {addressInfo.map((item, index) =>
              <View key={index} style={styles.addressItem}>
                <Image style={styles.checkboxIcon} source={require('./../images/checkbox.png')}/>
                <View style={styles.addressInfo}>
                  <Text>{item.name} {item.phone}</Text>
                  <Text>{item.address}</Text>
                </View>
                <Image style={styles.editIcon} source={require('./../images/edit.png')}/>
              </View>
            )}
          </View>
          <TouchableWithoutFeedback onPress={this.toAddress.bind(this)}>
            <View style={styles.addressAdd}>
              <Image style={styles.addIcon} source={require('./../images/addAddr.png')}/>
              <Text>添加地址</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  orderItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  orderInfo: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderDetail: {
    padding: 10,
    flexDirection: 'row'
  },
  goodsImage: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  orderDescribe: {
    width: Dimensions.get('window').width - 90,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  orderCount: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderTotal: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  buttonGroup: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: '#c00',
    color: '#fff',
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 2
  },
  addressItem: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  addressInfo: {
    width: Dimensions.get('window').width - 80
  },
  addressAdd: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxIcon: {
    width: 20,
    height: 20
  },
  editIcon: {
    width: 20,
    height: 20
  },
  addIcon: {
    width: 20,
    height: 20
  }
});
