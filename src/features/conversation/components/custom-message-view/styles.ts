/**
 * External dependencies.
 */
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
    container: {
        paddingVertical: verticalScale(3),
        paddingHorizontal: scale(10),
    },
});
