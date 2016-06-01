/**
 * @file 自适应高度的 TextInput
 * @author ielgnaw(wuji0223@gmail.com)
 */

import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

'use strict';

export default class AutoExpandingTextInput extends Component {

    static propTypes = {
        onChangeHeight: React.PropTypes.func.isRequired,
        minHeight: React.PropTypes.number.isRequired,
        maxHeight: React.PropTypes.number
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            height: this.props.minHeight,
            maxHeight: this.props.maxHeight || this.props.minHeight * 3
        };
    }

    render() {

    }

}
