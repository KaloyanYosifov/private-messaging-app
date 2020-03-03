/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { Icon, OverflowMenu, StyleType, TopNavigationAction } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */

const TopNavigationMenu = (): React.ReactFragment => {
    const [menuVisible, setMenuVisible] = useState(false);

    const menuData = [
        {
            title: 'Logout',
            action: () => console.log('123'),
            icon: (style: StyleType) => <Icon {...style} name="log-out" />,
        },
    ];

    const onMenuSelect = (index) => {
        console.log(index, menuData[index].action());
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

export default TopNavigationMenu;
