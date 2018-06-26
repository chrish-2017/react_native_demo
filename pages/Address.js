import React, { Component } from 'react';
import TabBarComponent from './TabBar';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Dimensions,
  Picker,
  TouchableWithoutFeedback,
} from 'react-native';

export default class AddressComponent extends Component {
  constructor(props) {
    super(props);
    let address = require('./../data/address.json');
    let provinceArray = [];
    for (let i = 0; i < address.length; i++) {
      provinceArray.push(address[ i ]);
    }
    this.state = {
      provinceArray: provinceArray,
      cityArray: [],
      areaArray: [],
      province: '',
      city: '',
      area: '',
      isDefault: false
    }
  }

  toMine() {
    /*let address = {
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address
    };*/
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        title: '地址管理',
        component: TabBarComponent,
        params: {
          selectedTab: '我的',
          initialPage: 1
        }
      });
    }
  }

  check() {
    let isDefault = !this.state.isDefault;
    this.setState({
      isDefault: isDefault
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.addressForm}>
            <TextInput onChangeText={(text) => this.setState({ name: text })} placeholder='收货人姓名'/>
            <TextInput onChangeText={(text) => this.setState({ phone: text })} placeholder='电话号码'/>
            <View style={styles.pickerItem}>
              <Text>省:</Text>
              <Picker
                style={styles.picker}
                mode={Picker.MODE_DIALOG}
                selectedValue={this.state.province}
                onValueChange={(choice, position) =>
                  this.setState({
                    province: choice,
                    cityArray: this.state.provinceArray[ position ].sub
                  })
                }
              >
                {this.state.provinceArray.map((aOption) => <Picker.Item color='#b5b9be' label={aOption.name}
                                                                        value={aOption.name} key={aOption.name}/>)}
              </Picker>
            </View>
            <View style={styles.pickerItem}>
              <Text>市:</Text>
              <Picker
                style={styles.picker}
                mode={Picker.MODE_DIALOG}
                selectedValue={this.state.city}
                onValueChange={(choice, position) =>
                  this.setState({
                    city: choice,
                    areaArray: this.state.cityArray[ position ].sub
                  })
                }
              >
                {this.state.cityArray.map((aOption) => <Picker.Item color='#b5b9be' label={aOption.name}
                                                                    value={aOption.name} key={aOption.name}/>)}
              </Picker>
            </View>
            <View style={styles.pickerItem}>
              <Text>县:</Text>
              <Picker
                style={styles.picker}
                mode={Picker.MODE_DIALOG}
                selectedValue={this.state.area}
                onValueChange={(choice) =>
                  this.setState({
                    area: choice
                  })
                }
              >
                {this.state.areaArray.map((aOption) => <Picker.Item color='#b5b9be' label={aOption.name}
                                                                    value={aOption.name} key={aOption.name}/>)}
              </Picker>
            </View>
            <TextInput onChangeText={(text) => this.setState({ address: text })} placeholder='详细地址'/>
            <View style={styles.setDefault}>
              <TouchableWithoutFeedback onPress={this.check.bind(this)}>
                <Image style={styles.checkboxIcon}
                       source={this.state.isDefault ? require('./../images/selectedCheckbox.png') : require('./../images/checkbox.png')}/>
              </TouchableWithoutFeedback>
              <Text> 设置为默认地址</Text>
            </View>
            <Text style={styles.saveInfo} onPress={this.toMine.bind(this)}>保存</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addressForm: {
    backgroundColor: '#fff',
    padding: 10
  },
  setDefault: {
    marginTop: 10,
    marginLeft: 4,
    flexDirection: 'row'
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    zIndex: -1
  },
  saveInfo: {
    marginTop: 20,
    backgroundColor: '#c00',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    zIndex: -1
  },
  pickerItem: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    flexDirection: 'row',
    alignItems: 'center'
  },
  picker: {
    marginLeft: 130,
    width: Dimensions.get('window').width - 180
  }
});
