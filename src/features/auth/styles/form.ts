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
        justifyContent: 'flex-end',
        marginBottom: verticalScale(200),
        paddingLeft: moderateScale(30, .5),
        paddingRight: moderateScale(30, .5),
    },
    formBody: {
        marginTop: verticalScale(20),
    },
    formInput: {
        marginBottom: verticalScale(10),
    },
    lastFormInput: {
        marginBottom: verticalScale(20),
    },
    button: {
        marginBottom: verticalScale(10),
    },
    linkText: {
        textAlign: 'center',
    },
});

export default styles;
