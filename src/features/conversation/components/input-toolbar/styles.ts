/**
 * External dependencies.
 */
import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        bottom: 0,
        left: 0,
        right: 0,
    },
    textFieldContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    accessory: {
        height: verticalScale(44),
    },
});
