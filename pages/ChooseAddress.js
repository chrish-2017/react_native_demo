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

const addressInfo = [
  { name: "邹凌", phone: "18380447856", address: "成都高新区天府软件园" },
  { name: "邹凌", phone: "18380447856", address: "成都高新区天府软件园" }
];
export default class ChooseAddressComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      hide: true,
      addressInfo: addressInfo,
      address: ''
    };
  }

  check(index) {
    let addressInfo = this.state.addressInfo;
    addressInfo[ index ].checked = !addressInfo[ index ].checked;
    if (addressInfo[ index ].checked) {
      for (let i = 0; i < addressInfo.length; i++) {
        if (i != index) {
          addressInfo[ i ].checked = false;
        }
      }
    }
    this.setState({
      addressInfo: addressInfo,
      address: addressInfo[ index ]
    })
  }

  render() {
    if (this.state.hide) {
      return (<View/>)
    } else {
      return (
        <View style={styles.container}>
          <Animated.View style={styles.overlay}>
          </Animated.View>

          <Animated.View style={styles.content}>
            <View style={styles.addressList}>
              {addressInfo.map((item, index) =>
                <View key={index} style={styles.addressItem}>
                  <TouchableWithoutFeedback onPress={this.check.bind(this, index)}>
                    <Image style={styles.checkboxIcon}
                           source={item.checked ? require('./../images/selectedCheckbox.png') : require('./../images/checkbox.png')}/>
                  </TouchableWithoutFeedback>
                  <View style={styles.addressInfo}>
                    <Text>{item.name} {item.phone}</Text>
                    <Text>{item.address}</Text>
                  </View>
                  <Image style={styles.editIcon} source={require('./../images/edit.png')}/>
                </View>
              )}
            </View>
            <Text style={styles.button} onPress={this.choose.bind(this)}>确定</Text>
          </Animated.View>
        </View>
      );
    }
  }

  //显示动画
  in() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0.8,
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

  //选择
  choose() {
    if (!this.state.hide) {
      this.out();
      let address = this.state.address;
      if (address) {
        let chooseTip = address.name + ' ' + address.phone + '\n' + address.address;
        this.parent.setState({
          chooseTip: chooseTip
        });
      }
    }
  }

  show(obj: Object) {
    this.parent = obj;
    if (this.state.hide) {
      this.setState({ hide: false }, this.in);
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
    height: 183,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0
  },
  addressItem: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5'
  },
  addressInfo: {
    width: Dimensions.get('window').width - 120
  },
  checkboxIcon: {
    width: 20,
    height: 20
  },
  editIcon: {
    width: 20,
    height: 20
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
  }
});
