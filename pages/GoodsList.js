import React, { Component } from 'react';
import GoodsDetailComponent from './GoodsDetail';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

var goodsInfo = [
  {
    typeName: "新品上架",
    goodsList: [
      { image: require('./../images/goods.jpg'), name: "双肩背包", price: "39.00" },
      { image: require('./../images/goods.jpg'), name: "双肩背包", price: "39.00" },
      { image: require('./../images/goods.jpg'), name: "双肩背包", price: "39.00" },
      { image: require('./../images/goods.jpg'), name: "双肩背包", price: "39.00" }
    ]
  }
];
export default class GoodsListComponent extends Component {
  constructor(props) {
    super(props);
  }

  toGoodsDetail() {
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        title: '商品详情',
        component: GoodsDetailComponent
      });
    }
  }

  render() {
    return (
      <View style={styles.goodsList}>
        {goodsInfo.map((item, index) =>
          <View key={index} style={styles.goodsItem}>
            <View style={styles.title}>
              <View style={styles.line}></View>
              <Text>新品上架</Text>
              <View style={styles.line}></View>
            </View>
            <View style={styles.content}>
              {item.goodsList.map((item, index) =>
                <TouchableWithoutFeedback key={index} onPress={this.toGoodsDetail.bind(this)}>
                  <View key={index} style={styles.goodsItem}>
                    <Image style={styles.goodsImage} source={item.image}/>
                    <View style={styles.goodsDescribe}>
                      <Text style={styles.goodsName}>{item.name}</Text>
                      <Text style={styles.goodsPrice}>{item.price}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  goodsList: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1
  },
  goodsItem: {
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  line: {
    width: (Dimensions.get('window').width - 116) / 2,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  goodsImage: {
    width: 160,
    height: 100
  },
  goodsDescribe: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  goodsName: {
    fontSize: 12
  },
  goodsPrice: {
    fontSize: 12
  }
});
