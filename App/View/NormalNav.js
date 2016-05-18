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

let styles = require('../styles');

class NormalNav extends Component {

    constructor() {
        super();
        this.alertMenu = this.alertMenu.bind(this);
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
    render() {
        let children = [];

        for (var i = 0; i < 20; i++) {
            children.push(
                <View key={'key_' + i}>
                    <TouchableHighlight
                        underlayColor='#99d9f4'
                        onPress={this.alertMenu}>
                        <View style={styles.child}>
                            <Text>{'T' + i}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.separator} />
              </View>
            );
        }
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  {children}
                </ScrollView>
            </View>
        );
    }
}

export {NormalNav};