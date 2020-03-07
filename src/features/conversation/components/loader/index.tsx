/**
 * External dependencies.
 */
import React from 'react';
import { Layout, Spinner } from '@ui-kitten/components';

/**
 * Internal dependencies.
 */

const Loader = (): React.ReactFragment => (
    <Layout>
        <Spinner size="medium" />
    </Layout>
);

export default Loader;
