/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, OverflowMenu, StyleType, TopNavigationAction } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import { navigation } from '@/router';
import { logOut } from '@/store/authentication/actions';

interface TopNavigationMenuProps {
    logOut: Function
}

const TopNavigationMenu = ({ logOut }: TopNavigationMenuProps): React.ReactFragment => {
    const [menuVisible, setMenuVisible] = useState(false);

    const menuData = [
        {
            title: 'Logout',
            action: () => {
                logOut();
                navigation().navigate('AuthRouter');
                setMenuVisible(false);
            },
            icon: (style: StyleType) => <Icon {...style} name="log-out" />,
        },
    ];

    const onMenuSelect = (index) => {
        menuData[index].action();
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <OverflowMenu
            visible={menuVisible}
            data={menuData}
            onSelect={onMenuSelect}
            onBackdropPress={toggleMenu}>
            <TopNavigationAction
                icon={(style) => <Icon {...style} name="more-vertical" />}
                onPress={toggleMenu}
            />
        </OverflowMenu>
    );
};

const mapDispatchToProps = {
    logOut,
};

export default connect(null, mapDispatchToProps)(TopNavigationMenu);
