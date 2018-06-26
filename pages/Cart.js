import React, { Component } from 'react';
import PayComponent from './Pay';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

var goodsInfo = [
  { image: require('./../images/goods.jpg'), name: "双肩背包", tag: "春季新品", price: "39.00", number: 1 },
  { image: require('./../images/goods.jpg'), name: "双肩背包", tag: "春季新品", price: "39.00", number: 1 }
];
export default class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsInfo: goodsInfo,
      selectAll: false,
      totalPrice: 0
    }
  }

  toPay() {
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        title: '订单结算',
        component: PayComponent
      });
    }
  }

  minus(number, index) {
    if (number > 1) {
      number--;
    }
    let goodsInfo = this.state.goodsInfo;
    goodsInfo[ index ].number = number;
    this.setState({
      goodsInfo: goodsInfo
    });
    this.count();
  }

  add(number, index) {
    number++;
    let goodsInfo = this.state.goodsInfo;
    goodsInfo[ index ].number = number;
    this.setState({
      goodsInfo: goodsInfo
    });
    this.count();
  }

  check(index) {
    let goodsInfo = this.state.goodsInfo;
    goodsInfo[ index ].checked = !goodsInfo[ index ].checked;
    let count = 0;
    let selectAll = false;
    for (let i = 0; i < goodsInfo.length; i++) {
      if (goodsInfo[ i ].checked) {
        count++;
      }
    }
    if (count == goodsInfo.length) {
      selectAll = true
    }
    this.setState({
      goodsInfo: goodsInfo,
      selectAll: selectAll
    });
    this.count();
  }

  selectAll() {
    let selectAll = !this.state.selectAll;
    let goodsInfo = this.state.goodsInfo;
    for (let i = 0; i < goodsInfo.length; i++) {
      goodsInfo[ i ].checked = selectAll;
    }
    this.setState({
      goodsInfo: goodsInfo,
      selectAll: selectAll
    })
  }

  count() {
    let goodsInfo = this.state.goodsInfo;
    let totalPrice = 0;
    for (let i = 0; i < goodsInfo.length; i++) {
      if (goodsInfo[ i ].checked) {
        totalPrice += parseInt(goodsInfo[ i ].price) * parseInt(goodsInfo[ i ].number);
      }
    }
    this.setState({
      totalPrice: totalPrice
    })
  }

  delete(index) {
    let goodsInfo = this.state.goodsInfo;
    goodsInfo.splice(index, 1);
    this.setState({
      goodsInfo: goodsInfo
    });
    this.count();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.goodsList}>
            {this.state.goodsInfo.map((item, index) =>
              <View key={index} style={styles.goodsItem}>
                <TouchableWithoutFeedback onPress={this.check.bind(this, index)}>
                  <Image style={styles.checkboxIcon}
                         source={item.checked ? require('./../images/selectedCheckbox.png') : require('./../images/checkbox.png')}/>
                </TouchableWithoutFeedback>
                <Image style={styles.goodsImage} source={item.image}/>
                <View style={styles.goodsDescribe}>
                  <Text>{item.name}</Text>
                  <Text style={styles.goodsTag}>{item.tag}</Text>
                  <Text>￥{item.price}</Text>
                </View>
                <View style={styles.goodsCount}>
                  <TouchableWithoutFeedback onPress={this.minus.bind(this, item.number, index)}>
                    <Image style={styles.countIcon} source={require('./../images/minusIcon.png')}/>
                  </TouchableWithoutFeedback>
                  <Text style={styles.goodsNumber}>{item.number}</Text>
                  <TouchableWithoutFeedback onPress={this.add.bind(this, item.number, index)}>
                    <Image style={styles.countIcon} source={require('./../images/addIcon.png')}/>
                  </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={this.delete.bind(this, index)}>
                  <Image style={styles.delIcon} source={require('./../images/delete.png')}/>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={styles.selectAll}>
            <TouchableWithoutFeedback onPress={this.selectAll.bind(this)}>
              <Image style={styles.checkboxIcon}
                     source={this.state.selectAll ? require('./../images/selectedCheckbox.png') : require('./../images/checkbox.png')}/>
            </TouchableWithoutFeedback>
            <Text> 全选 </Text>
          </View>
          <Text>合计: ￥{this.state.totalPrice}</Text>
          <Text style={styles.button} onPress={this.toPay.bind(this)}>结算</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  goodsList: {
    flex: 1
  },
  goodsItem: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  goodsImage: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10
  },
  goodsDescribe: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  goodsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 10
  },
  goodsNumber: {
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold'
  },
  checkboxIcon: {
    width: 20,
    height: 20
  },
  countIcon: {
    width: 30,
    height: 30
  },
  delIcon: {
    //width: 15,
    //height: 15,
    position: 'absolute',
    top: 5,
    right: 10
  },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectAll: {
    flexDirection: 'row',
    paddingLeft: 10
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
