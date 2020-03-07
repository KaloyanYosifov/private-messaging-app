/**
 * External dependencies.
 */
import React from 'react';
import { Divider, Icon, Layout, TopNavigation as UIKittenTopNavigation, TopNavigationAction } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import styles from './styles';
import { navigation } from '@/router';

interface TopNavigationProps {
    title: string
}

const topNavigationAction = () => {
    const onPress = () => {
        navigation().goBack();
    };

    return (
        <TopNavigationAction
            icon={(style) => <Icon {...style} name="arrow-back" />}
            onPress={onPress}
        />
    );
};

const TopNavigation = ({ title }: TopNavigationProps): React.ReactFragment => {
    return (
        <Layout style={styles.container}>
            <UIKittenTopNavigation
                leftControl={topNavigationAction()}
                alignment="center"
                title={title}
            />
            <Divider />
        </Layout>
    );
};

export default TopNavigation;
