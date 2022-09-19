import * as React from "react";
import {Avatar, Input, List} from "antd";
import {useEffect, useState} from "react";
import {useActions} from "../hoooks/useActions";
import {useCookies} from "react-cookie";
import {useTypedSelector} from "../hoooks/useTypedSelector";
import {IUser} from "../models/IUser";
import moment from "moment";


const UsersList: React.FC = () => {
    const {getUsers} = useActions()
    const [cookies] = useCookies()
    const {users} = useTypedSelector(state => state.users)
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        getUsers(cookies.token)
    }, [])

    let filteredUsers = users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))
    if (id !== '') filteredUsers = filteredUsers.filter(user => user.id == parseInt(id))

    return (
        <>
            <h2>Search</h2>
            <Input value={id} placeholder="ID" onChange={e => setId(e.target.value)} />
            <Input value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <List
            itemLayout="horizontal"
            dataSource={filteredUsers}
            renderItem={(user: IUser) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={`${user.first_name || 'Unknown name'} ${user.last_name || 'Unknown last_name'} (${user.username})`}
                        description={`${user.last_login ? `This user last logged in ${moment(user.last_login).format('YYYY-MM-DD HH:mm:ss')}` : 'Not logged'}. This user is ${user.is_active ? "active" : "is not active"}.`}
                    />
                </List.Item>
            )}
        />
        </>
    );
};

export default UsersList;
