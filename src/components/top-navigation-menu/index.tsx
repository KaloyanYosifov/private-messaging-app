/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { Icon, OverflowMenu, StyleType, TopNavigationAction } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */
import { navigation } from '@/router';
import { logOut } from '@/store/authentication/actions';
import { MenuData } from '@/interfaces/MenuData';

interface TopNavigationMenuProps {
    logOut: Function,
    menuData: MenuData[]
}

const TopNavigationMenu = ({ logOut, menuData }: TopNavigationMenuProps): React.ReactFragment => {
    const [menuVisible, setMenuVisible] = useState(false);

    const localMenuData: MenuData[] = [...menuData, {
        title: 'Logout',
        action: () => {
            logOut();
            navigation().dispatch(StackActions.popToTop);
            navigation().navigate('AuthRouter');
        },
        icon: (style: StyleType) => <Icon {...style} name="log-out" />,
    }];

    const onMenuSelect = (index) => {
        const response = localMenuData[index].action();

        if (response instanceof Promise) {
            response.finally(() => setMenuVisible(false));
            return;
        }

        setMenuVisible(false);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <OverflowMenu
            visible={menuVisible}
            data={localMenuData}
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
