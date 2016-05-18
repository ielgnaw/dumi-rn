/**
 * @file ios 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Navigator,
    ScrollView,
    Platform,
    TouchableOpacity,
    AlertIOS
} from 'react-native';
import {NormalNav} from './App/View/NormalNav';

'use strict';

let styles = require('./App/styles');

const defaultRoute = {
  component: NormalNav,
  title: '度秘'
};

class dumiApp extends Component {
    constructor() {
        super();
        this.onRightButtonPress = this.onRightButtonPress.bind(this);
    }

    _renderScene(route, navigator) {
        let Component = route.component;
        return (
            <Component {...route.params} navigator={navigator} />
        );
    }

    onRightButtonPress() {
        AlertIOS.alert('123');
    }

    _renderNavBar() {
        let me = this;
        let routeMapper = {
            LeftButton(route, navigator, index, navState) {
                if (index > 0) {
                    return (
                        <TouchableOpacity
                            onPress={() => navigator.pop()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>返回</Text>
                        </TouchableOpacity>
                    );
                }
                return null;
            },
            RightButton(route, navigator, index, navState) {
                if (index === 0) {
                    return (
                        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center', height: 40}}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigator.push({
                                        component: NormalNav,
                                        title: '度秘设置'
                                    });
                                }}
                                style={styles.button}>
                                <Text style={styles.buttonText}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={me.onRightButtonPress}
                                style={styles.button}>
                                <Text style={styles.buttonText}>2</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
                return null;
            },
            Title(route, navigator, index, navState) {
                return (
                    <View style={styles.title}>
                        <Text style={[styles.titleText, ]}>{route.title ? route.title : 'Splash'}</Text>
                    </View>
                );
            }
        };

        return (
            <Navigator.NavigationBar
                style={{
                    alignItems: 'center',
                    // backgroundColor: '#55ACEE',
                    backgroundColor: '#f8f8f8',
                    // shadowOffset:{
                    //     width: 1,
                    //     height: 0.5,
                    // },
                    // // shadowColor: '#f8f8f8',
                    // shadowOpacity: 0.8,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#ccc'
                }}
                routeMapper={routeMapper}
            />
        );
    }
    render() {
        return (
            <Navigator
                initialRoute={defaultRoute}
                renderScene={this._renderScene}
                // sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 74)}}
                configureScene={(route) => {
                    // return Navigator.SceneConfigs.VerticalDownSwipeJump;
                    // return Navigator.SceneConfigs.FloatFromRight;
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                navigationBar={this._renderNavBar()} />
        );
    }
}

AppRegistry.registerComponent('dumiApp', () => dumiApp);
