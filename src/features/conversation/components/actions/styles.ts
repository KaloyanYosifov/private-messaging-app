/**
 * External dependencies.
 */
import { Platform, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
    container: {
        height: Platform.select({
            ios: verticalScale(32),
            android: verticalScale(40),
        }),
        paddingTop: verticalScale(0),
    },
});
