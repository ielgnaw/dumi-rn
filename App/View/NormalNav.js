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
    TouchableHighlight
} from 'react-native';

var styles = require('../styles');

var List = require('./List');
var Edit = require('./Edit');

class NormalNav extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {txt: 'Learn react native', complete: false},
                {txt: 'Make a to-do app', complete: true}
            ]
        };
        this.alertMenu = this.alertMenu.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.openItem = this.openItem.bind(this);
    }

    deleteItem(index) {
        var items = this.state.items;
        items.splice(index, 1);
        this.setState({items: items})
    }

    updateItem(item, index) {
        var items = this.state.items;
        if (index) {
            items[index] = item;
        }
        else {
            items.push(item)
        }
        this.setState({items: items});
        this.props.navigator.pop();
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
    openItem(rowData, rowID) {
        this.props.navigator.push({
            title: rowData && rowData.txt || 'New Item',
            component: Edit,
            passProps: {item: rowData, id: rowID, update: this.updateItem}
        });
    }
    render() {
        return (
            <View style={{flex:1}}>
                <List
                    items={this.state.items}
                    onPressItem={this.openItem}
                    onLongPressItem={this.alertMenu}/>
                <TouchableHighlight
                    style={[styles.button, styles.newButton]}
                    underlayColor='#99d9f4'
                    onPress={this.openItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export {NormalNav};