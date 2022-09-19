import React, {FC, useState} from 'react';
import {Button, Form, Input, Modal, Switch} from "antd";
import {rules} from "../utils/rules";
import {useActions} from "../hoooks/useActions";
import {useTypedSelector} from "../hoooks/useTypedSelector";

type NewUserProps = {
    isModalOpen: boolean
    setIsModalOpen: Function
}

const NewUser: FC<NewUserProps> = ({isModalOpen, setIsModalOpen}) => {
    const token = useTypedSelector(state => state.auth.token)
    const {error} = useTypedSelector(state => state.users)
    const {createNewUsers} = useActions()

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);

    const createHandler = async () => {
        await createNewUsers(token, {
            username: username,
            first_name: firstName,
            last_name: lastName,
            is_active: isActive,
            password: password
        })

        setIsModalOpen(false)
    }

    return (
        <Modal title="Basic Modal" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={createHandler}>
            <Form>
                <Form.Item
                    label={'Username'}
                    name={'username'}
                    rules={[
                        rules.required('Please input your username!'),
                        rules.minLength(1, 'Min length is 1 symbol'),
                        rules.maxLength(150, 'Min length is 150 symbols'),
                        rules.pattern(/^[\w.@+-]+$/, 'Wrong pattern')
                    ]}
                >
                    <Input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={'Firstname'}
                    name={'firstname'}
                    rules={[rules.maxLength(30)]}
                >
                    <Input
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={'Lastname'}
                    name={'lastname'}
                    rules={[rules.maxLength(150)]}
                >
                    <Input
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={'Password'}
                    name={'password'}
                    rules={[
                        rules.required('Please input your password!'),
                        rules.minLength(8),
                        rules.maxLength(128),
                        rules.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
                    ]}
                >
                    <Input.Password
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />
                </Form.Item>
                <Form.Item label="Active">
                    <Switch checked={isActive} onChange={() => setIsActive(p => !p)}/>
                </Form.Item>
                {error && <h4 style={{color: "red"}}>{error}</h4>}
            </Form>
        </Modal>
    );
};

export default NewUser;
