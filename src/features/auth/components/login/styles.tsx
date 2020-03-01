/**
 * External dependencies.
 */
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        marginTop: verticalScale(200),
        paddingLeft: moderateScale(30, .5),
        paddingRight: moderateScale(30, .5),
    },
    formBody: {
        marginTop: verticalScale(30),
    },
    formInput: {
        marginBottom: verticalScale(10),
    },
});

export default styles;
