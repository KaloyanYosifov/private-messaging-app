/**
 * External dependencies.
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies.
 */
import { init } from '@/helpers/socket';
import { getAuthToken } from '@/store/authentication/getters';

const Initializations = ({ getAuthToken }: { getAuthToken: string }): React.ReactFragment => {
    useEffect(() => {
        init(getAuthToken);
    }, []);

    return (<></>);
};

const mapStateToProps = (state) => ({
    getAuthToken: getAuthToken(state),
});

export default connect(mapStateToProps)(Initializations);
