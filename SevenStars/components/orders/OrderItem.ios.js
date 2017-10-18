import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class OrderItem extends Component {
  _onClick() {
    this.props.onClick(this.props.data);
  }

  render() {
    const products = this.props.data.details.map((detail)=>detail.product);
    return (
      <TouchableHighlight
        underlayColor={'lightgrey'}
        onPress={this._onClick.bind(this)}>
        <View style={styles.row}>
          <View>
            <Text style={styles.id}>
              PO# {this.props.data.id}
            </Text>
          </View>
          <View>
            <Text style={styles.details}>
              {products.join(', ')}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

var styles = StyleSheet.create({
  row: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    padding: 18,
  },
  detail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 22
  },
  text: {
    alignSelf: 'center',
    color: '#000',
  },
  id: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  details: {
    color:'#000',
    fontSize:12
  }
});
