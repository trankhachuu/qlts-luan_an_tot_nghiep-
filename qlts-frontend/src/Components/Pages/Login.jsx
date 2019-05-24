import React from 'react';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import '../../Styles/Login.css';
import { loginByUsername } from '../../Services/api';
import { setToken, getToken } from '../../Utils/token'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }


    handleSubmit = e => {
        e.preventDefault();
        if (this.state.isLogin === false) {
            this.setState({ isLogin: true })
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    try {
                        var data = await loginByUsername(values.userName, values.password);
                        setToken(data);
                        const { history } = this.props;
                        setTimeout(() => {
                            history.push('/');
                        }, 1000);
                    } catch (e) {
                        this.setState({ isLogin: false })
                    }
                }
            });
        }
    };

    componentWillMount() {
        const { history } = this.props;
        let token = getToken();
        if (token) {
            history.push('/');
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className={'login_label'}>Login</div>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(Login);