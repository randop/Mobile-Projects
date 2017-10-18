import React, { Component, PropTypes } from 'react';
import {
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import api from '../../api.js';

import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

export default class OrderDetail extends Component {
  constructor(props, context){
    super(props, context);
  }

  processOrder(orderId){
    let component = this;
    try{
      api
        .put('/orders/' + orderId + '/process')
        .then((response) => {
          component.props.filterShippedOrder(orderId);
          component.props.navigator.pop();
        });
    } catch(err){
      //void
    }
  }

  shipmentDelivered(orderId){
    let component = this;
    try{
      api
        .put('/shipments/' + orderId + '/delivered')
        .then((response) => {
          component.props.filterDeliveredOrder(orderId);
          component.props.navigator.pop();
        });
    } catch(err){
      //void
    }
  }

  _renderActionButton(){
    let component = this;
    if ( this.props.order.status=='NEW' ){
      return(<GiftedForm.SubmitWidget
        title='Process Shipment'
        widgetStyles={{
          submitButton: {
            backgroundColor: '#1a82fb',
            marginTop: 20
          },
          textSubmitButton: {
            color: '#fff'
          }
        }}
        onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
          const order = component.props.order;
          component.processOrder(order.id);
        }}
      />);
    } else if ( this.props.order.status=='SHIPPING' ) {
      return(<GiftedForm.SubmitWidget
        title='Delivered'
        widgetStyles={{
          submitButton: {
            backgroundColor: '#29a03b',
            marginTop: 20
          },
          textSubmitButton: {
            color: '#fff'
          }
        }}
        onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
          const order = component.props.order;
          component.shipmentDelivered(order.id);
        }}
      />);
    }
  }

  render(){
    const details = this.props.order.details.map((detail, idx)=>{
      return <View key={idx} style={styles.detailContainer}>
        <View style={styles.detailColumn}>
          <Text numberOfLines={1} style={styles.quantity}>{detail.quantity}</Text>
        </View>
        <View style={styles.detailColumnProduct}>
          <Text style={styles.productLabel}>{detail.product}</Text>
        </View>
      </View>;
    });
    return(
      <GiftedForm formName='OrderDetailForm' style={styles.form}>
        <GiftedForm.TextInputWidget
          name='id'
          title='PO#'
          placeholder=''
          editable={false}
          clearButtonMode='while-editing'
          value={this.props.order.id}
          widgetStyles={{
            textInputTitleInline: styles.textLabel
          }}
        />
        <GiftedForm.TextInputWidget
          name='customer'
          title='Customer'
          placeholder=''
          editable={false}
          clearButtonMode='while-editing'
          value={this.props.order.customer}
          widgetStyles={{
            textInputTitleInline: styles.textLabel
          }}
        />
        <View style={styles.rowContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.textInputTitle}>Address</Text>
          </View>
          <TextInput
            style={styles.address}
            multiline = {true}
            numberOfLines = {4}
            editable={false}
            value={this.props.order.shipAddress}
          />
        </View>
        <View style={styles.rowContainer2}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.textInputTitle}>Orders</Text>
          </View>
        </View>
        {details}
        {this._renderActionButton()}
      </GiftedForm>
    );
  }
}

const styles = StyleSheet.create({
  address: {
    height: 90,
    fontSize: 15,
    flex: 1,
    marginLeft: 40,
  },
  form: {
    paddingTop: 77
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10
  },
  detailColumn: {
    width: 77
  },
  detailColumnProduct: {
    flex: 1
  },
  productLabel: {
    fontSize: 16
  },
  rowContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#c8c7cc',
  },
  rowContainer2: {
    backgroundColor: '#FFF',
    borderBottomWidth: 0,
    borderColor: '#c8c7cc',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkslateblue',
    textAlign: 'right',
    paddingRight: 10
  },
  textLabel: {
    color: 'gray'
  },
  textInputTitle: {
    fontSize: 15,
    color: 'gray',
    paddingLeft: 10,
    flex: 1
  },
  titleContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
