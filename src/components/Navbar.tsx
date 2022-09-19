import {Menu, Row} from 'antd';
import {Header} from 'antd/lib/layout/layout';
import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hoooks/useTypedSelector";
import {useActions} from "../hoooks/useActions";

const Navbar: FC = () => {
    const {token} = useTypedSelector(state => state.auth)
    const navigate = useNavigate()
    const { logout } = useActions()

    const publicItems = [
        {
            label: 'Login', key: 'login', onClick: () => {
                navigate('/login')
            }
        }
    ];

    const privateItems = [
        {
            label: 'Log out', key: 'logout', onClick: () => {
                logout()
            }
        }
    ];

    return (
        <Header>
            <Row justify={'end'}>
                {token !== ''
                    ? <Menu theme={"light"} mode="horizontal" items={privateItems} selectable={false}/>
                    : <Menu theme={"light"} mode="horizontal" items={publicItems} selectable={false}/>
                }
            </Row>
        </Header>
    );
};

export default Navbar;
