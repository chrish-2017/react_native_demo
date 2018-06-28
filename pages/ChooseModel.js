import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

const hostString = 'https://easy-mock.com/mock/5b3357dce144ee0b9ede2e12/store';
export default class ChooseModelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      hide: true,
      choosed: 0,
      number: 1,
      goodsInfo: this.props.goodsInfo,
      goodsAttrs: this.props.goodsAttrs
    }
  }

  render() {
    if (this.state.hide) {
      return (<View/>)
    } else {
      return (
        <View style={styles.container}>
          <Animated.View style={styles.overlay}>
          </Animated.View>

          <Animated.View style={[ styles.content ]}>
            <View style={styles.imageBox}>
              <Image style={styles.goodsImage}
                     source={{ uri: this.state.goodsInfo.goodsImgs[ 0 ].image.imgName }}/>
            </View>
            <View style={styles.goodsInfo}>
              <Text style={styles.goodsPrice}>￥{this.state.goodsAttrs[ this.state.choosed ].sellPrice}</Text>
              <Text>库存{this.state.goodsAttrs[ this.state.choosed ].inventory.inventoryAmount}件</Text>
            </View>
            <TouchableWithoutFeedback onPress={this.choose.bind(this)}>
              <Image style={styles.closeIcon} source={require('./../images/close.png')}/>
            </TouchableWithoutFeedback>
            <View style={styles.modelItem}>
              <View style={styles.modelContent}>
                {this.state.goodsAttrs.map((item, index) =>
                  this.state.choosed === index ?
                    <Text key={index} style={styles.selectedItem}>{item.attrValue}</Text>
                    :
                    <Text key={index} style={styles.selectItem}
                          onPress={this.selectAttr.bind(this, index)}>{item.attrValue}</Text>
                )}
              </View>
            </View>
            <View style={styles.goodsCount}>
              <Text style={styles.dark}>数量</Text>
              <View style={styles.modelContent}>
                <TouchableWithoutFeedback onPress={this.minus.bind(this)}>
                  <Image style={styles.countIcon} source={require('./../images/minusIcon.png')}/>
                </TouchableWithoutFeedback>
                <Text style={styles.goodsNumber}>{this.state.number}</Text>
                <TouchableWithoutFeedback onPress={this.add.bind(this)}>
                  <Image style={styles.countIcon} source={require('./../images/addIcon.png')}/>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <Text style={styles.button} onPress={this.choose.bind(this)}>确定</Text>
          </Animated.View>
        </View>
      );
    }
  }

  selectAttr(index) {
    this.setState({
      choosed: index
    })
  }

  minus() {
    let number = this.state.number;
    if (number > 1) {
      number--;
    }
    this.setState({
      number: number
    })
  }

  add() {
    let number = this.state.number;
    number++;
    this.setState({
      number: number
    })
  }

  //显示动画
  in() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0.8
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 1
        }
      )
    ]).start();
  }

  //隐藏动画
  out() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0
        }
      )
    ]).start();

    setTimeout(
      () => this.setState({ hide: true }),
      500
    );
  }

  show(obj: Object) {
    this.parent = obj;
    if (this.state.hide) {
      this.setState({ hide: false }, this.in);
    }
  }

  //选择
  choose() {
    if (!this.state.hide) {
      this.out();
      let goodsAttrs = this.state.goodsAttrs;
      let choosed = this.state.choosed;
      let attr = goodsAttrs[ choosed ].attrValue;
      let number = this.state.number;
      if (attr && number) {
        let chooseTip = attr + '/' + number;
        this.parent.setState({
          chooseTip: chooseTip
        })
      }
      this.parent.nextPage();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute'
  },
  overlay: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#383838',
    opacity: 0.8

  },
  content: {
    width: Dimensions.get('window').width,
    height: 266,
    backgroundColor: '#fff',
    paddingTop: 20,
    position: 'absolute',
    bottom: 0
  },
  imageBox: {
    borderWidth: 0.5,
    borderColor: '#aaa',
    position: 'absolute',
    top: 1,
    left: 20
  },
  goodsImage: {
    width: 100,
    height: 100
  },
  goodsInfo: {
    height: 80,
    marginLeft: 140
  },
  goodsPrice: {
    fontSize: 16,
    color: '#f44336',
    marginBottom: 5
  },
  closeIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 15,
    right: 15
  },
  modelItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0
  },
  goodsCount: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  modelContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectItem: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    margin: 10,
    borderColor: '#ccc',
    color: '#000'
  },
  selectedItem: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    margin: 10,
    borderColor: '#ccc',
    backgroundColor: '#e00',
    color: '#fff'
  },
  countIcon: {
    width: 30,
    height: 30
  },
  goodsNumber: {
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  button: {
    backgroundColor: '#c00',
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: 'center'
  },
  dark: {
    color: '#000'
  }
});
