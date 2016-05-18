

import {StyleSheet,PixelRatio,Platform} from 'react-native';

'use strict';

let Dimensions = require('Dimensions');

let styles = StyleSheet.create({

    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'flex-start',
    //     padding: 10,
    //     backgroundColor: '#fff',
    // },
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'android' ? 56 : 64),
        // marginTop: (Platform.OS === 'android' ? 66 : 74) * PixelRatio.get(),
        height: Dimensions.get('window').height,
    },

    child: {
        height:80,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleText: {
        fontSize: 20
    },

    buttonText: {
        fontSize: 18
    },

    scrollView: {
        flex: 1
    },

    row: {
        backgroundColor: '#3a5795',
        borderColor: 'red',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    text: {
        alignSelf: 'center',
        color: '#fff',
    },
    scrollview: {
        flex: 1,
    },
});

module.exports = styles;