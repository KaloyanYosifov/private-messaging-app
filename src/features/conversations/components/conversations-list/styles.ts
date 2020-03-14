/**
 * External dependencies.
 */
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { themes } from '@ui-kitten/components';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    conversationsContainer: {
        flex: 1,
        marginHorizontal: scale(20),
    },
    loadingContainer: {
        marginTop: verticalScale(20),
        alignItems: 'center',
    },
});
