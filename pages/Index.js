import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import GoodsListComponent from './GoodsList';
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
const categoryInfo = [
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
  }

  static navigationOptions = {
    title: '首页'
  };

  toGoodsList() {
    this.props.navigation.navigate('List');
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Swiper
            height={200}
            autoplay={true}
            activeDotColor="#fff">
            {sliderImages.map((item, index) =>
              <Image key={index} source={item} style={styles.page}/>
            )}
          </Swiper>

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

          <GoodsListComponent navigation={this.props.navigation}/>
        </View>
      </ScrollView>
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
  category: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 10,
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
