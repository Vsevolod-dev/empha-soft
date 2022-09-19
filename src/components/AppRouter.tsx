import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import UserList from "../pages/UsersList";
import Login from "../pages/Login";
import {useTypedSelector} from "../hoooks/useTypedSelector";

const AppRouter = () => {
    const {token} = useTypedSelector(state => state.auth)

    return (
        token !== ''
            ? <Routes>
                <Route path={'/'} element={<UserList/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
            : <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>

    );
};

export default AppRouter;
