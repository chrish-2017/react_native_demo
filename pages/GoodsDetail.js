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
  TouchableWithoutFeedback
} from 'react-native';

const hostString = 'https://easy-mock.com/mock/5b3357dce144ee0b9ede2e12/store';
export default class GoodsDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselImages: null,
      goodsInfo: null,
      chooseTip: '请选择规格/数量'
    }
  }

  componentDidMount() {
    this.init();
  }

  init() {
    fetch(hostString + '/intranet/goods/get?goodsId=187')
      .then((response) => response.json())
      .then((responseJson) => {
        const goodsInfo = responseJson.o;
        const goodsAttrs = goodsInfo.goodsAttrs;
        const goodsImgs = goodsInfo.goodsImgs;
        const description = goodsInfo.description;
        let specificationsModel = goodsInfo.specificationsModel;
        const carouselImages = [];
        let brandImage;
        for (let i = 0; i < goodsAttrs.length; i++) {
          const orderClosingTime = goodsAttrs[ i ].orderClosingTime;
          if (new Date(orderClosingTime) < new Date()) {
            goodsAttrs[ i ].orderClose = true;
          }
        }
        console.log("goodsAttrs==");
        console.log(goodsAttrs);
        for (let i = 0; i < goodsImgs.length; i++) {
          const imageType = goodsImgs[ i ].imageType;
          const imgName = goodsImgs[ i ].image.imgName;
          if (imageType === 1) {
            carouselImages.push(imgName);
          } else if (imageType === 3) {
            brandImage = imgName;
          }
        }
        console.log("brandImage==");
        console.log(brandImage);
        specificationsModel = specificationsModel.split("\n");
        goodsInfo.specificationsModel = specificationsModel;
        this.setState({
          carouselImages: carouselImages,
          goodsInfo: goodsInfo,
          description: description,
          goodsAttrs: goodsAttrs,
          brandImage: brandImage
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.carouselImages && this.state.goodsInfo) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Swiper
              height={400}
              autoplay={true}
              activeDotColor="#fff">
              {this.state.carouselImages.map((item, index) =>
                <Image key={index} source={{uri: item}} style={styles.page}/>
              )}
            </Swiper>

            <View style={styles.goodsInfo}>
              <Text style={styles.goodsName}>{this.state.goodsInfo.goodsName}</Text>
              <Text style={styles.goodsTag}>{this.state.goodsInfo.goodsTitle}</Text>
              <Text style={styles.goodsPrice}>￥{this.state.goodsInfo.goodsAttrs[ 0 ].sellPrice}</Text>
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
              <Text style={[ styles.button, styles.blue ]} onPress={this.toCart.bind(this, 1)}>加入购物车</Text>
              <Text style={styles.button} onPress={this.toPay.bind(this, 2)}>立即购买</Text>
            </View>
          </View>

          <ChooseModelComponent ref="chooseModel" goodsInfo={this.state.goodsInfo} goodsAttrs={this.state.goodsAttrs}/>
        </View>
      );
    } else {
      return null;
    }
  }

  showModel(type) {
    this.setState({ type: type });
    this.refs.chooseModel.show(this);
  }

  nextPage() {
    let type = this.state.type;
    if (1 === type) {
      this.toCart();
    } else if (2 === type) {
      this.toPay();
    }
  }

  toPay() {
    this.props.navigation.navigate('Pay');
  }

  toCart() {
    this.props.navigation.navigate('Cart');
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
    padding: 10,
    marginBottom: 10
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
    marginBottom: 10,
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
