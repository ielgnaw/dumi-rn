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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

// const myIcon = (<Icon name="navicon" size={150} color="blue" />)

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
        this.toggleMute = this.toggleMute.bind(this);
        this.state = {
            isMute: 0
        };
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

    toggleMute() {
        this.setState({isMute: !this.state.isMute});
    }

    _renderNavBar() {
        let me = this;
        let routeMapper = {
            LeftButton(route, navigator, index, navState) {
                if (index > 0) {
                    return (
                        <View style={[styles.leftNav, {}]}>
                            <TouchableOpacity
                                onPress={() => navigator.pop()}
                                style={styles.navButton}>
                                <Text style={[styles.navButtonText,{left: -10}]}>
                                    <MaterialIcon name='chevron-left' size={40} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigator.pop()}
                                style={styles.navButton}>
                                <Text style={[styles.navButtonText, {left:-32}]}>返回</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
                return null;
            },
            RightButton(route, navigator, index, navState) {
                if (index === 0) {
                    var volumeIconStr = me.state.isMute ? 'volume-off' : 'volume-up';
                    return (
                        <View style={[styles.rightNav, {}]}>
                            <TouchableOpacity
                                // onPress={me.onRightButtonPress}
                                style={styles.navButton}>
                                <Text style={[styles.navButtonText, {height: 21,left:20}]}>
                                    <MaterialIcon name={volumeIconStr} size={21} onPress={me.toggleMute}/>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigator.push({
                                        component: NormalNav,
                                        title: '度秘设置'
                                    });
                                }}
                                style={styles.navButton}>
                                <Text style={[styles.navButtonText, {height: 18}]}>
                                    <EvilIcon name="navicon" size={25}/>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
                return null;
            },
            Title(route, navigator, index, navState) {
                return (
                    <View style={styles.navTitle}>
                        <Text style={[styles.navTitleText, ]}>{route.title ? route.title : 'Splash'}</Text>
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
