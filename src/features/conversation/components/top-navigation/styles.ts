/**
 * External dependencies.
 */
import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
    container: {
        flex: 1,
        minHeight: verticalScale(44),
        maxHeight: verticalScale(44),
    },
});
