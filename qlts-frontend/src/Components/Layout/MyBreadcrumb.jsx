import React from 'react';
import { Breadcrumb, Icon } from 'antd';

class MyBreadcrumb extends React.PureComponent {

    renderMyBreadcrumb() {
        return this.props.data.map((item, key) => {
            return (
                <Breadcrumb.Item key={key}>
                    {item.icon !== "none" ? <Icon type={item.icon} /> : ''}
                    <span>{item.name}</span>
                </Breadcrumb.Item>
            )
        })
    }

    render() {
        return (
            <Breadcrumb style={this.props.style}>
                <Breadcrumb.Item href="">
                    <Icon type="home" />
                </Breadcrumb.Item>
                {this.renderMyBreadcrumb()}
            </Breadcrumb>

        );
    }
}
export default MyBreadcrumb;
