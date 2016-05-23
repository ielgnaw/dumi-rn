

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
        height: Dimensions.get('window').height
    },

    leftNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },

    rightNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },

    navTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    navTitleText: {
        fontSize: 20
    },

    navButton: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    navButtonText: {
        fontSize: 18
    },

    scrollView: {
        flex: 1
    },

    leftDialogWarp: {
        left: 10
    },

    leftDialog: {
        flexDirection: 'row'
    },

    leftDialogAvatarWrap: {
        margin: 3,
        borderWidth:1,
        borderColor:'#e8e8e8',
        borderRadius:18,
        height:38
    },

    leftDialogAvatar: {
        height:25,
        width:25,
        margin:5
    },

    leftDialogContentWrap: {
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#e0e0e0',
        borderRadius: 3,
        margin: 3,
        padding: 5
    },

    leftDialogText: {
        lineHeight: 20,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    },

    rightDialogWarp: {
        flexDirection: 'row',
    },

    rightDialogContentWrap: {
        left: 53,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 3,
        margin: 3,
        padding: 5
    },

    rightDialogText: {
        lineHeight: 20,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    },

    rightDialogAvatarWrap: {
        left: 53,
        margin: 3,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 18,
        height: 38
    },

    rightDialogAvatar: {
        height: 25,
        width: 25,
        margin: 5
    }

});

module.exports = styles;