

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
        // marginTop: (Platform.OS === 'android' ? 66 : 74),
        marginTop: (Platform.OS === 'android' ? 33 : 32) * PixelRatio.get(),
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
    }
});

module.exports = styles;