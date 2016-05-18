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
    RefreshControl
} from 'react-native';

let styles = require('../styles');

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

class NormalNav extends Component {

    constructor() {
        super();
        this.alertMenu = this.alertMenu.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.state = {
            isRefreshing: false,
            rowData: Array.from(new Array(20)).map((val, i) => ({text: '初始行 ' + i})),
            loaded: 0
        };
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

    render() {
        console.warn('render');

        let rows = this.state.rowData.map((row, ii) => {
          return <Row key={ii} data={row}/>;
        });

        return (
            <View style={styles.container}>
                {/*<View style={{
                    flex: -1,
                    backgroundColor: '#0f0',
                    borderColor: '#0f0',
                    borderRadius: 30,
                    borderWidth: 1
                }}>
                    <Text style={{color:'red',}}>asdasd</Text>
                </View>*/}
                <ScrollView style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                  {rows}
                </ScrollView>
            </View>
        );
    }
}

export {NormalNav};