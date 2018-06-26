import React, { Component } from 'react';
import ViewPager from 'react-native-viewpager';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import ChooseModelComponent from './ChooseModel';
import PayComponent from './Pay';
import TabBarComponent from './TabBar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

var sliderImages = [
  require('./../images/slide.jpg'),
  require('./../images/slide.jpg'),
  require('./../images/slide.jpg')
];
var goodsInfo = {
  name: "双肩背包双肩背包双肩背包双肩背包",
  tag: "春季新品春季新品春季新品春季新品",
  price: "39.00"
};
export default class GoodsDetailComponent extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });
    this.state = {
      dataSource: dataSource.cloneWithPages(sliderImages),
      chooseTip: '请选择颜色/尺码'
    }
  }

  showModel() {
    this.refs.chooseModel.show(this);
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

  toCart() {
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        title: '购物车',
        component: TabBarComponent,
        params: {
          selectedTab: '购物车'
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ViewPager
            dataSource={this.state.dataSource}
            renderPage={this.renderPage}
            isLoop={true}
            autoPlay={true}/>

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

  renderPage(data) {
    return (
      <Image
        source={data}
        style={styles.page}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    height: 200,
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
