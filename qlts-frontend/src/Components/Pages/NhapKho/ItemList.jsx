import React, { Component } from 'react';
import { List, Avatar } from 'antd';

class ItemList extends Component {
    render() {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="http://localhost:3000/biennhan.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description}
                            />
                        </List.Item>
                    )}
                />,
            </div>
        );
    }
}

export default ItemList;