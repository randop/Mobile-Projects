import React, { Component } from 'react';
import {
  NavigatorIOS,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import api from '../../api.js';

import OrderItem from './OrderItem';
import OrderDetail from './OrderDetail';

export default class Orders extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRefreshing: false,
      orders: []
    }
  }

  componentDidMount(){
    this.loadOrders();
  }

  loadOrders(){
    let component = this;
    this.setState({isRefreshing: true});
    try{
      api
        .get('/orders')
        .then((response) => {
          component.setState({
            isRefreshing: false,
            orders: response.data.Items
          });
        });
    } catch(err){
      component.setState({isRefreshing: false});
    }
  }

  filterShippedOrder(orderId){
    const orders = this.state.orders.filter((order)=>{
      if ( order.id!=orderId ){
        return order;
      } else {
        return false;
      }
    });
    this.setState({orders});
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _showOrderDetail(row){
    const nextRoute = {
      component: OrderDetail,
      title: '',
      passProps: {order: row, filterShippedOrder: this.filterShippedOrder.bind(this) }
    };
    this.props.navigator.push(nextRoute);
  }

  _onRefresh() {
    this.loadOrders();
  }

  render(){
    let rows = this.state.orders.map((row, ii) => {
      return <OrderItem key={ii} data={row} onClick={this._showOrderDetail.bind(this, row)} />;
    });
    if ( this.state.orders.length==0 && this.state.isRefreshing===false ){
      rows = <Text style={styles.noItemNotice}>No orders to display.</Text>
    }
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor='gray'
            title='Loading...'
            titleColor='gray'
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="white"
          />
        }>
        {rows}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  noItemNotice: {
    color: 'gray',
    paddingTop: 10,
    flex: 1,
    textAlign: 'center',
  },
  scrollview: {
    flex: 1,
  }
});
