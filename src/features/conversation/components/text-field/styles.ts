/**
 * External dependencies.
 */
import { Platform, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
    textInput: {
        flex: 1,
        fontSize: 16,
        borderColor: 'transparent',
        paddingLeft: scale(15),
        paddingTop: verticalScale(7),
        lineHeight: 16,
        marginTop: Platform.select({
            ios: verticalScale(6),
            android: 0,
        }),
        marginBottom: Platform.select({
            ios: verticalScale(5),
            android: verticalScale(3),
        }),
    },
});
