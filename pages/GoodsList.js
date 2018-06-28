import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const hostString = 'https://easy-mock.com/mock/5b3357dce144ee0b9ede2e12/store';
export default class GoodsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: null
    }
  }

  componentDidMount() {
    this.init();
  }

  init() {
    fetch(hostString + '/intranet/goods/getChildrenType?goodsTypeId=137')
      .then((response) => response.json())
      .then((responseJson) => {
        const goodsList = responseJson.records;
        console.log("goodsList==");
        console.log(goodsList);
        this.setState({
          goodsList: goodsList
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.goodsList) {
      return (
        <ScrollView>
          <View style={styles.goodsList}>
            {this.state.goodsList.map((item, index) =>
              <TouchableWithoutFeedback key={index} onPress={this.toGoodsDetail.bind(this)}>
                <View style={styles.goodsItem}>
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
        </ScrollView>
      );
    } else {
      return null;
    }
  }

  toGoodsDetail() {
    this.props.navigation.navigate('Detail');
  }
}

const styles = StyleSheet.create({
  goodsList: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  goodsItem: {
    paddingTop: 5,
    paddingBottom: 5
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
