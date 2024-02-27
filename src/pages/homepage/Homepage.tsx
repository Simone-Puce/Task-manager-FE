import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'antd';

class Homepage extends Component {
    render() {
        return (
            <div className="homepage-form_container">
                <Space direction="horizontal" align="center" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>CARHLO</span>
                    <div className="logoutButton">
                        <Button type='primary'>
                            <Link to="/">LOG OUT</Link>
                        </Button>
                    </div>
                </Space>
            </div>
        );
    }
}

export default Homepage;