/**
 * External dependencies.
 */
import React from 'react';
import { StyleType } from '@ui-kitten/components';

export interface MenuData {
    title: string,
    action: Function,
    icon: (style: StyleType) => React.ReactFragment
}
