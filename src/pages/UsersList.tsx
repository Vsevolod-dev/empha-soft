import * as React from "react";
import {Avatar, Button, Input, List, Modal} from "antd";
import {useEffect, useState} from "react";
import {useActions} from "../hoooks/useActions";
import {useCookies} from "react-cookie";
import {useTypedSelector} from "../hoooks/useTypedSelector";
import {IUser} from "../@types/IUser";
import moment from "moment";
import {PlusOutlined} from '@ant-design/icons';
import UserModal from '../components/UserModal'


const UsersList: React.FC = () => {
    const {getUsers, deleteUser} = useActions()
    const [cookies] = useCookies()
    const {users} = useTypedSelector(state => state.users)
    const token = useTypedSelector(state => state.auth.token)
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalUserid, setModalUserid] = useState(0);

    useEffect(() => {
        getUsers(cookies.token)
    }, [])

    let filteredUsers = users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))
    if (id !== '') filteredUsers = filteredUsers.filter(user => user.id === parseInt(id))

    const removeHandler = (id?: number) => {
        if (id) deleteUser(token, id)
    }

    const editHandler = (id?: number) => {
        if (typeof(id) === 'number') {
            setModalUserid(id)
            setIsModalOpen(true)
        }
    }

    return (
        <>
            <h2>Search</h2>
            <div className={'filters'}>
                <Input value={id} placeholder="ID" onChange={e => setId(e.target.value)}/>
                <Input value={username} placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={filteredUsers}
                renderItem={(user: IUser) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                            title={`${user.first_name || 'Unknown name'} ${user.last_name || 'Unknown last_name'} (${user.username})`}
                            description={`${user.last_login ? `This user last logged in ${moment(user.last_login).format('YYYY-MM-DD HH:mm:ss')}` : 'Not logged'}. This user is ${user.is_active ? "active" : "is not active"}.`}
                        />
                        <div>
                            <Button
                                type="primary"
                                size={"small"}
                                onClick={() => editHandler(user.id)}>
                                edit
                            </Button>
                            <Button
                                type="primary"
                                size={"small"}
                                style={{marginLeft: 10, backgroundColor: "red", border: "red"}}
                                onClick={() => removeHandler(user.id)}
                            >
                                remove
                            </Button>
                        </div>
                    </List.Item>
                )}
            />
            <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined/>}
                size={"small"}
                onClick={() => editHandler(0)}
            >
                Create new
            </Button>
            <UserModal id={modalUserid} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </>
    );
};

export default UsersList;
