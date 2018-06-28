import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const hostString = 'https://easy-mock.com/mock/5b3357dce144ee0b9ede2e12/store';
export default class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsInfo: null
    }
  }

  static navigationOptions = {
    title: '购物车'
  };

  componentDidMount() {
    this.init();
  }

  init() {
    fetch(hostString + '/intranet/cart/getAllCart?createBy=88')
      .then((response) => response.json())
      .then((responseJson) => {
        const goodsInfo = responseJson.o;
        for (let i = 0; i < goodsInfo.length; i++) {
          if (goodsInfo[ i ].goodsAttr.goods.isPutaway) {
            goodsInfo[ i ].checked = true;
          }
        }
        console.log("goodsInfo==");
        console.log(goodsInfo);
        this.setState({
          goodsInfo: goodsInfo
        });
        this.count();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.goodsInfo) {
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
                  <Image style={styles.goodsImage}
                         source={{ uri: item.goodsAttr.goods.goodsImgs[ 0 ].image.imgName }}/>
                  <View style={styles.goodsDescribe}>
                    <View>
                      <Text>{item.goodsAttr.goods.goodsName}</Text>
                      <Text style={styles.goodsTag}>{item.goodsAttr.attrValue}</Text>
                    </View>
                    <Text style={styles.goodsPrice}>￥{item.goodsAttr.sellPrice}</Text>
                  </View>
                  <View style={styles.goodsCount}>
                    <TouchableWithoutFeedback onPress={this.minus.bind(this, item.counts, index)}>
                      <Image style={styles.countIcon} source={require('./../images/minusIcon.png')}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.goodsNumber}>{item.counts}</Text>
                    <TouchableWithoutFeedback onPress={this.add.bind(this, item.counts, index)}>
                      <Image style={styles.countIcon} source={require('./../images/addIcon.png')}/>
                    </TouchableWithoutFeedback>
                  </View>
                  <TouchableWithoutFeedback onPress={this.del.bind(this, index)}>
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
            <Text>合计: <Text style={styles.goodsPrice}>{this.state.totalPrice}</Text></Text>
            <Text style={styles.button} onPress={this.toPay.bind(this)}>结算</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  count() {
    let goodsInfo = this.state.goodsInfo;
    let selectAll = true;
    let totalPrice = 0;
    for (let i = 0; i < goodsInfo.length; i++) {
      if (goodsInfo[ i ].checked) {
        totalPrice += Number(goodsInfo[ i ].goodsAttr.sellPrice) * Number(goodsInfo[ i ].counts);
      } else {
        selectAll = false;
      }
    }
    this.setState({
      selectAll: selectAll,
      totalPrice: totalPrice
    })
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
    if (count === goodsInfo.length) {
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
    });
    this.count();
  }

  minus(number, index) {
    if (number > 1) {
      number--;
    }
    let goodsInfo = this.state.goodsInfo;
    goodsInfo[ index ].counts = number;
    this.setState({
      goodsInfo: goodsInfo
    });
    this.count();
  }

  add(number, index) {
    number++;
    let goodsInfo = this.state.goodsInfo;
    goodsInfo[ index ].counts = number;
    this.setState({
      goodsInfo: goodsInfo
    });
    this.count();
  }

  del(index) {
    let goodsInfo = this.state.goodsInfo;
    goodsInfo.splice(index, 1);
    this.setState({
      goodsInfo: goodsInfo
    });
    this.count();
  }

  toPay() {
    this.props.navigation.navigate('Pay');
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
    width: Dimensions.get('window').width - 150,
    height: 80,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  goodsTag: {
    color: '#aaa'
  },
  goodsPrice: {
    color: '#f00'
  },
  goodsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  goodsNumber: {
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold'
  },
  checkboxIcon: {
    width: 20,
    height: 20
  },
  countIcon: {
    width: 20,
    height: 20
  },
  delIcon: {
    width: 15,
    height: 18,
    position: 'absolute',
    top: 10,
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
