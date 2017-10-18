import React, { Component } from 'react';
import { TabBarIOS, View, StyleSheet, Text, NavigatorIOS } from 'react-native';

import Orders from './orders/Orders';
import Shipments from './shipments/Shipments';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'orders'
    }
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Orders"
          icon={require('../icons/inbox.png')}
          selected={this.state.selectedTab === 'orders'}
          onPress={() => {
            this.setState({
              selectedTab: 'orders',
            });
          }}>
          <NavigatorIOS
            ref='ordersNav'
            initialRoute={{
              component: Orders,
              title: 'Orders',
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../icons/shipment.png')}
          title="Shipments"
          selected={this.state.selectedTab === 'shipments'}
          onPress={() => {
            this.setState({
              selectedTab: 'shipments'
            });
          }}>
          <NavigatorIOS
            ref='shipmentsNav'
            initialRoute={{
              component: Shipments,
              title: 'Shipments',
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../icons/report.png')}
          title="Reports"
          selected={this.state.selectedTab === 'reports'}
          onPress={() => {
            this.setState({
              selectedTab: 'reports',
            });
          }}>
          <View style={styles.reportsView}><Text>Reports</Text></View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  reportsView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
