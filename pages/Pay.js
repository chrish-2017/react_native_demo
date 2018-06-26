import React, { Component } from 'react';
import ChooseAddressComponent from './ChooseAddress';
import TabBarComponent from './TabBar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

var goodsInfo = [
  { name: "双肩背包", image: require('./../images/goods.jpg'), tag: "春季新款", price: "39.00", number: 1 },
  { name: "双肩背包", image: require('./../images/goods.jpg'), tag: "春季新款", price: "39.00", number: 1 }
];
export default class PayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseTip: '收货地址'
    }
  }

  showModel() {
    this.refs.chooseModel.show(this);
  }

  toMine() {
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        title: '我的订单',
        component: TabBarComponent,
        params: {
          selectedTab: '我的',
          initialPage: 0
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={this.showModel.bind(this)}>
            <View style={styles.chooseModel}>
              <Text>{this.state.chooseTip}</Text>
              <Image style={styles.rightIcon} source={require('./../images/right.png')}/>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.goodsList}>
            {goodsInfo.map((item, index) =>
              <View key={index} style={styles.goodsItem}>
                <Image style={styles.goodsImage} source={item.image}/>
                <View style={styles.goodsDetail}>
                  <Text>{item.name}</Text>
                  <Text>{item.tag}</Text>
                  <View style={styles.goodsDescribe}>
                    <Text>￥{item.price}</Text>
                    <Text>×{item.number}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.orderTotal}>
            <Text>共2件商品 小计：￥78</Text>
          </View>
          <View style={styles.orderFee}>
            <Text>运费</Text>
            <Text>￥12</Text>
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <Text>合计: ￥90</Text>
          <Text style={styles.button} onPress={this.toMine.bind(this)}>支付</Text>
        </View>
        <ChooseAddressComponent ref="chooseModel"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chooseModel: {
    backgroundColor: '#fff',
    padding: 10,
    paddingRight: 5,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightIcon: {
    width: 20,
    height: 20
  },
  goodsList: {
    flex: 1
  },
  goodsItem: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  goodsImage: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  goodsDetail: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  goodsDescribe: {
    width: Dimensions.get('window').width - 90,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderTotal: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  orderFee: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#c00',
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40
  }
});
