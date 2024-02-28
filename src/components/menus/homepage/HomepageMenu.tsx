import { Menu, MenuProps, } from "antd"
import React from "react";
import {
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const items: MenuProps['items'] = [
    {
        key: 1,
        icon: React.createElement(UserOutlined),
        label: "Profile"
    },
    {
        key: 2,
        icon: React.createElement(MailOutlined),
        label: "Notifications",
    },
    {
        key: 3,
        icon: React.createElement(HomeOutlined),
        label: "Homepage",
    },
    {
        key: 4,
        icon: React.createElement(CloseOutlined),
        label: "Logout",
    } 
]

const HomepageMenu = () => {
    const navigate = useNavigate()

    const menuNavigation = (key: number): void => {
        const newObj: any = items[key - 1]
        navigate("/"+newObj.label.toLowerCase())
    }

    return (
        <Menu theme="dark" mode="inline" items={items} onClick={({ key }) => {
            menuNavigation(Number(key))
        }} />
    )
}

export default HomepageMenu