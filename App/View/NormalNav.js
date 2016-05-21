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

import ReactNative from 'react-native';

let styles = require('../styles');

let Dimensions = require('Dimensions');

const Row = React.createClass({
    _onClick: function() {
        this.props.onClick(this.props.data);
    },
    render: function() {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>
                    {this.props.data.text}
                </Text>
            </View>
        );
    }
});

let AutosizingText = React.createClass({
    getInitialState: function() {
        return {
            width: null
        }
    },

    componentDidMount() {
        setTimeout(() => {
            this.refs.view.measure((x, y, width, height) => {
                TextMeasurer.get(this.props.children, len => {
                    if (len < width) {
                        this.setState({
                            width: len
                        });
                    }
                })
            });
        });
    },

    render() {
        return <View ref="view" style={{backgroundColor: 'red', width: this.state.width}}><Text ref="text">{this.props.children}</Text></View>
    }
});

class NormalNav extends Component {

    constructor() {
        super();
        this.alertMenu = this.alertMenu.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            isRefreshing: false,
            rowData: Array.from(new Array(20)).map((val, i) => ({text: '初始行 ' + i})),
            loaded: 0,
            btnLocation: 0
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
            // 准备下拉刷新的5条数据
            const rowData = Array.from(new Array(5)).map((val, i) => ({
                text: '刷新行 ' + (+this.state.loaded + i)
            })).concat(this.state.rowData);
            this.setState({
                loaded: this.state.loaded + 5,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 3000);
    }

    inputFocused(refName) {
        setTimeout(() => {
            let scrollResponder = this.refs.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                ReactNative.findNodeHandle(this.refs[refName]),
                110, //additionalOffset
                true
            );
        }, 50);
    }

    render() {

        let rows = this.state.rowData.map((row, ii) => {
          return <Row key={ii} data={row}/>;
        });

        let rightWidth = Dimensions.get('window').width - 115;

        let me = this;

        return (
            <View style={[styles.container, {}]}>
                {/*<View style={{
                    flex: -1,
                    backgroundColor: '#0f0',
                    borderColor: '#0f0',
                    borderRadius: 30,
                    borderWidth: 1
                }}>
                    <Text style={{color:'red',}}>asdasd</Text>
                </View>*/}
                <ScrollView style={[styles.scrollView, {}]}
                    keyboardShouldPersistTaps={false}
                    ref="scrollView"
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    {/*rows*/}
                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>

                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>
                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>
                    <View style={{left: 10}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://b.hiphotos.baidu.com/baike/s%3D235/sign=7062923d504e9258a23481eda983d1d1/c2fdfc039245d688ad7ec8fda2c27d1ed21b246e.jpg'}}></Image>
                            </View>
                            <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text style={{lineHeight:20,paddingLeft:5,paddingRight:5,paddingBottom:5}}>
                                    短纤维发但是三点发格瑞特让人头二七区去恶趣味去恶趣味去问切去
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                            <View style={{left: 53,backgroundColor:'#fff',borderWidth:1,borderColor:'#e0e0e0',margin: 3,width: rightWidth,padding:5}}>
                                <Text>2222222222222222222222222222222222222222222222222222222222222222222222</Text>
                            </View>
                            <View style={{left:53,margin: 3,borderWidth:1,borderColor:'#e8e8e8',borderRadius:18, height:38}}>
                                <Image style={{height:25,width:25,margin:5}}
                                    source={{uri:'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png'}}></Image>
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <TextInput
                    style={{bottom: this.state.btnLocation,height:37,fontSize: 12,color:'#aaa',paddingHorizontal:15,paddingVertical:6,borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize = "none"
                    autoCorrect={false}
                    multiline = {true}
                    keyboardType = "default"
                    ref='textInput'
                    placeholder = "请输入手机号或邮箱"
                    placeholderTextColor = "#999"
                    onChangeText={(text) => this.setState({text})}
                >
                </TextInput>
                {/*<TextInput
                    style={{bottom: this.state.btnLocation,height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                  />*/}
            </View>
        );
    }
}

export {NormalNav};