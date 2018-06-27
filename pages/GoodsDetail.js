import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import ChooseModelComponent from './ChooseModel';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const sliderImages = [
  require('./../images/slide.jpg'),
  require('./../images/slide.jpg'),
  require('./../images/slide.jpg')
];
const goodsInfo = {
  name: "双肩背包双肩背包双肩背包双肩背包",
  tag: "春季新品春季新品春季新品春季新品",
  price: "39.00"
};
export default class GoodsDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseTip: '请选择颜色/尺码'
    }
  }

  showModel() {
    this.refs.chooseModel.show(this);
  }

  toPay() {
    this.props.navigation.navigate('Pay');
  }

  toCart() {
    this.props.navigation.navigate('Cart');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Swiper
            height={200}
            autoplay={true}
            activeDotColor="#fff">
            {sliderImages.map((item, index) =>
              <Image key={index} source={item} style={styles.page}/>
            )}
          </Swiper>

          <View style={styles.goodsInfo}>
            <Text style={styles.goodsName}>{goodsInfo.name}</Text>
            <Text style={styles.goodsPrice}>￥{goodsInfo.price}</Text>
            <Text style={styles.goodsTag}>{goodsInfo.tag}</Text>
          </View>

          <TouchableWithoutFeedback onPress={this.showModel.bind(this)}>
            <View style={styles.chooseModel}>
              <Text>{this.state.chooseTip}</Text>
              <Image style={styles.rightIcon} source={require('./../images/right.png')}/>
            </View>
          </TouchableWithoutFeedback>

          <ScrollableTabView
            tabBarPosition='top'
            initialPage={0}
            renderTabBar={() => <DefaultTabBar/>}
            tabBarBackgroundColor="#fff"
            tabBarActiveTextColor="#f44336"
            tabBarInactiveTextColor="#666"
            tabBarTextStyle={{ fontWeight: 'normal' }}
            tabBarUnderlineStyle={{ height: 2, backgroundColor: '#f44336' }}
          >
            <View tabLabel='详情描述'>
              <Text>详情描述</Text>
            </View>
            <View tabLabel='产品参数'>
              <Text>产品参数</Text>
            </View>
            <View tabLabel='品牌描述'>
              <Text>品牌描述</Text>
            </View>
          </ScrollableTabView>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Image style={styles.contactIcon} source={require('./../images/contact.png')}/>
          <Image style={styles.buyCartIcon} source={require('./../images/buyCart.png')}/>
          <View style={styles.buttonGroup}>
            <Text style={[ styles.button, styles.blue ]} onPress={this.toCart.bind(this)}>加入购物车</Text>
            <Text style={styles.button} onPress={this.toPay.bind(this)}>立即购买</Text>
          </View>
        </View>

        <ChooseModelComponent ref="chooseModel"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    resizeMode: 'stretch'
  },
  goodsInfo: {
    backgroundColor: '#fff',
    padding: 10
  },
  goodsName: {
    fontSize: 18
  },
  goodsPrice: {
    fontSize: 16,
    color: '#f44336'
  },
  goodsTag: {
    color: '#aaa'
  },
  chooseModel: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightIcon: {
    width: 20,
    height: 20
  },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactIcon: {
    width: 30,
    height: 30
  },
  buyCartIcon: {
    width: 30,
    height: 30
  },
  buttonGroup: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#c00',
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  blue: {
    backgroundColor: '#263238'
  }
});
