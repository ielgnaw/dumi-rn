/**
 * @file 聊天页面的顶导
 * @author ielgnaw(wuji0223@gmail.com)
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    AlertIOS,
    TouchableHighlight,
    RefreshControl,
    TextMeasurer,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
var AutoExpandingTextInput = require('react-native-auto-expanding-textinput');

let styles = require('../styles');

let Dimensions = require('Dimensions');

let RCTUIManager = require('NativeModules').UIManager;

const leftAvatar = ''
    + 'http://b.hiphotos.baidu.com/baike/s%3D235/'
    + 'sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg';

const rightAvatar = 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png';

const height = Dimensions.get('window').height;

let distance = 0;

class LeftDialog extends Component {
    render() {
        return (
            <View style={[styles.leftDialogWarp, {}]}>
                <View style={[styles.leftDialog, {}]}>
                    <View style={[styles.leftDialogAvatarWrap, {}]}>
                        <Image style={[styles.leftDialogAvatar, {}]}
                            source={{uri: leftAvatar}}></Image>
                    </View>
                    <View style={[styles.leftDialogContentWrap, {width: this.props.width}]}>
                        <Text style={[styles.leftDialogText, {}]}>
                            {this.props.content}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

class RightDialog extends Component {
    render() {
        return (
            <View style={[styles.rightDialogWarp, {}]}>
                <View style={[styles.rightDialogContentWrap, {width: this.props.width}]}>
                    <Text style={[styles.rightDialogText, {}]}>
                        {this.props.content}
                    </Text>
                </View>
                <View style={[styles.rightDialogAvatarWrap, {}]}>
                    <Image style={[styles.rightDialogAvatar, {}]}
                        source={{uri: rightAvatar}}></Image>
                </View>
            </View>
        );
    }
}

class NormalNav extends Component {

    constructor() {
        super();
        this.alertMenu = this.alertMenu.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            isRefreshing: false,
            loaded: 0,
            btnLocation: 0,
            refreshData: [],
            height: 40
        };
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow(e) {
        this.setState({btnLocation: e.endCoordinates.height})
    }

    keyboardWillHide(e) {
        this.setState({btnLocation: 0})
    }

    alertMenu() {
        // AlertIOS.alert('12131');
        // AlertIOS.alert(
        //     'Quick Menu',
        //     null,
        //     [
        //         {text: 'Delete', onPress: () => this.deleteItem(rowID)},
        //         {text: 'Edit', onPress: () => this.openItem(rowData, rowID)},
        //         {text: 'Cancel'}
        //     ]
        // )
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            let refreshData = Array.from(new Array(5)).map((val, i) => ({
                content: '刷新行 ' + (+this.state.loaded + i)
            })).concat(this.state.refreshData);
            this.setState({
                loaded: this.state.loaded + 5,
                isRefreshing: false,
                btnLocation: this.state.btnLocation,
                refreshData: refreshData,
            });
        }, 3000);
    }

    testFocus() {
        let sv = this.refs.scrollView;
        RCTUIManager.measure(
            sv.getInnerViewNode(), (...data) => {
                if (data[3] > height / 2 - 20) {
                    sv.scrollTo({
                        x: 0,
                        y: data[3] - height / 2 + 50,
                        animated: true
                    });
                    distance = data[3] - height / 2 + 50;
                }
            }
        );
    }

    testBlur() {
        let sv = this.refs.scrollView;
        // console.warn(sv.getInnerViewNode(), 'dd');
        RCTUIManager.measure(
            sv.getInnerViewNode(), (...data) => {
                // console.warn(data);
                // console.warn(distance);
                // if (data[3] > height / 2 - 20) {
                    sv.scrollTo({
                        x: 0,
                        y: 0,
                        animated: true
                    });
                // }
            }
        );
    }
    _onChangeHeight(before, after) {
        console.warn('_onChangeHeight');
        this.setState({height: Math.ceil(after)});
    }

    render() {
        let rightWidth = Dimensions.get('window').width - 115;
        let refreshData = this.state.refreshData.map((row, i) => {
            return (
                <View key={i}>
                    <LeftDialog content={row.content} width={rightWidth}/>
                    <RightDialog content={row.content} width={rightWidth}/>
                </View>
            );
        });

        return (
            <View style={[styles.container, {}]}>
                <ScrollView style={[styles.scrollView, {}]}
                    keyboardShouldPersistTaps={false}
                    ref="scrollView"
                    keyboardDismissMode="interactive"
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }>

                    <View>
                        {refreshData}
                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>

                        <LeftDialog content="asdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsadsasdadsads" width={rightWidth}/>
                        <RightDialog content="asdasdasdasasdsadasdadsdsadsads" width={rightWidth}/>
                    </View>
                </ScrollView>

                <View style={{
                    flexDirection: 'row',
                    height: this.state.height + 15,
                    bottom: this.state.btnLocation,
                    backgroundColor:'#eaeae8',
                    borderTopColor: '#dee0da',
                    borderTopWidth: 1,
                    borderBottomColor: '#dee0da',
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <MaterialIcon name="volume-off" size={25} style={{
                            color: '#676d6e',
                        }}/>
                    </View>

                    <View style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        height: this.state.height,
                        borderColor: '#d7d9d3',
                        borderWidth: 1,
                    }}>
                        <AutoExpandingTextInput
                            style={{fontSize: 15}}
                            underlineColorAndroid = {'transparent'}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType={'send'}
                            minHeight={40}
                            maxHeight={200}
                            onChangeHeight={(before, after) => this._onChangeHeight(before, after)}
                            onChangeText={(text) => this.setState({text})}
                            onFocus={() => this.testFocus()}
                            onBlur={() => this.testBlur()}
                            ref='textInput'
                        ></AutoExpandingTextInput>
                    </View>

                    <View style={{
                        width: 70,
                        flexDirection: 'row',
                        marginLeft: 10
                    }}>
                        <MaterialIcon name="volume-off" size={25} style={{
                            color: '#676d6e',
                            marginRight: 10
                        }}/>
                        <MaterialIcon name="volume-off" size={25} style={{
                            color: '#676d6e',
                            marginRight: 10
                        }}/>
                    </View>
                </View>

            </View>
        );
    }
}

export {NormalNav};