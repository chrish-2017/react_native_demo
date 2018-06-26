import React, { Component } from 'react';
import ViewPager from 'react-native-viewpager';
import GoodsListComponent from './GoodsList';
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
var categoryInfo = [
  { image: require('./../images/slide.jpg'), name: "新品上架" },
  { image: require('./../images/slide.jpg'), name: "新品上架" },
  { image: require('./../images/slide.jpg'), name: "新品上架" },
  { image: require('./../images/slide.jpg'), name: "新品上架" },
  { image: require('./../images/slide.jpg'), name: "新品上架" },
  { image: require('./../images/slide.jpg'), name: "新品上架" },
  { image: require('./../images/slide.jpg'), name: "新品上架" },
  { image: require('./../images/slide.jpg'), name: "新品上架" }
];
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });
    this.state = {
      dataSource: dataSource.cloneWithPages(sliderImages)
    }
  }

  toGoodsList() {
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        title: '商品列表',
        component: GoodsListComponent
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ViewPager
            dataSource={this.state.dataSource}
            renderPage={this.renderPage}
            isLoop={true}
            autoPlay={true}/>

          <View style={[ styles.category ]}>
            {categoryInfo.map((item, index) =>
              <TouchableWithoutFeedback key={index} onPress={this.toGoodsList.bind(this)}>
                <View style={[ styles.categoryItem ]}>
                  <Image style={[ styles.categoryImage ]} source={item.image}/>
                  <Text style={styles.categoryTitle}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>

          <GoodsListComponent navigator={this.props.navigator}/>
        </View>
      </ScrollView>
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
  category: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  categoryItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  categoryTitle: {
    fontSize: 12,
    marginTop: 5
  }
});
