import React, {useContext} from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Logout = function() {
    const { logout } = useContext(AuthContext);
    logout();
    window.location.href = window.location.origin;
    return (
        <>
        </>
    );
}

export default Logout;