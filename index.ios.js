/**
 * @file ios 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  ScrollView
} from 'react-native';
import {NormalNav} from './App/View/NormalNav';

var styles = require('./App/styles');

'use strict';

class dumiApp extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.navigator}
                initialRoute={{component: NormalNav, title: '度秘'}}/>
      );
    }
}

AppRegistry.registerComponent('dumiApp', () => dumiApp);
