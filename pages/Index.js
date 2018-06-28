import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const hostString = 'https://easy-mock.com/mock/5b3357dce144ee0b9ede2e12/store';
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselImages: null,
      goodsInfo: null
    }
  }

  static navigationOptions = {
    title: '首页'
  };

  componentDidMount() {
    this.init();
  }

  init() {
    fetch(hostString + '/intranet/homepage/getListByPage')
      .then((response) => response.json())
      .then((responseJson) => {
        const carouselImg = responseJson.records[ 0 ].carouselImg;
        const image = responseJson.records[ 0 ].image;
        const goodsType = responseJson.records[ 0 ].goodsType;
        const goodsTypeImgImage = responseJson.records[ 0 ].goodsTypeImgImage;
        const carouselImages = [];
        const categoryInfos = [];
        for (let i = 0; i < carouselImg.length; i++) {
          const goodsId = carouselImg[ i ].goodsId;
          const imgName = image[ i ].imgName;
          const carouselImage = {
            goodsId: goodsId,
            imgName: imgName
          };
          carouselImages.push(carouselImage);
        }
        console.log("carouselImages==");
        console.log(carouselImages);
        for (let i = 0; i < goodsType.length; i++) {
          const goodsTypeId = goodsType[ i ].id;
          const typeName = goodsType[ i ].typeName;
          const imgName = goodsTypeImgImage[ i ].imgName;
          const categoryInfo = {
            goodsTypeId: goodsTypeId,
            typeName: typeName,
            imgName: imgName
          };
          categoryInfos.push(categoryInfo);
        }
        console.log("categoryInfos==");
        console.log(categoryInfos);
        this.setState({
          carouselImages: carouselImages,
          categoryInfos: categoryInfos
        });
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(hostString + '/intranet/homepage/getGoodsNoListByPage')
      .then((response) => response.json())
      .then((responseJson) => {
        const goodsInfo = responseJson.records;
        console.log("goodsInfo==");
        console.log(goodsInfo);
        this.setState({
          goodsInfo: goodsInfo
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.carouselImages && this.state.goodsInfo) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Swiper
              height={200}
              autoplay={true}
              activeDotColor="#fff">
              {this.state.carouselImages.map((item, index) =>
                <Image key={index} source={{ uri: item.imgName }} style={styles.page}/>
              )}
            </Swiper>

            <View style={[ styles.category ]}>
              {this.state.categoryInfos.map((item, index) =>
                <TouchableWithoutFeedback key={index} onPress={this.toGoodsList.bind(this)}>
                  <View style={[ styles.categoryItem ]}>
                    <Image style={[ styles.categoryImage ]}
                           source={{ uri: item.imgName }}/>
                    <Text style={styles.categoryTitle}>{item.typeName}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>

            <View style={styles.goodsList}>
              {this.state.goodsInfo.map((item, index) =>
                <View key={index} style={styles.goodsItem}>
                  <View style={styles.title}>
                    <Text>{item.goodsType.typeName}</Text>
                    <Text style={styles.more}>...</Text>
                  </View>
                  <View style={styles.content}>
                    {item.goodsType.goodsList.map((item, index) =>
                      <TouchableWithoutFeedback key={index} onPress={this.toGoodsDetail.bind(this)}>
                        <View key={index} style={styles.goodsItem}>
                          <Image style={styles.goodsImage}
                                 source={{ uri: item.goodsImgs[ 0 ].image.imgName }}/>
                          <View>
                            <Text style={styles.goodsName}>{item.goodsName}</Text>
                            <Text style={styles.goodsPrice}>￥{item.goodsAttrs[ 0 ].sellPrice}</Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return null;
    }
  }

  toGoodsList() {
    this.props.navigation.navigate('List');
  }

  toGoodsDetail() {
    this.props.navigation.navigate('Detail');
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
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  categoryItem: {
    paddingLeft: 40,
    paddingRight: 40,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#000'
  },
  more: {
    fontSize: 20
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  goodsImage: {
    width: 160,
    height: 160
  },
  goodsName: {
    fontSize: 12,
    width: 160,
    height: 15
  },
  goodsPrice: {
    fontSize: 12
  }
});
