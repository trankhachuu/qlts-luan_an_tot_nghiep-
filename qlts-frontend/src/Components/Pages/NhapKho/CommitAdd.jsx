import React, { Component } from 'react';
import {
    Form, Input, Select, Button, Modal
} from 'antd';
import history from '../../../Utils/history'
import { nhapKhoHangLoat } from '../../../Services/api.js';
import { connect } from 'react-redux';

let Option = Select.Option;

class CommitAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstNhap: [
                {
                    maNhap: 'mua-moi',
                    tenNhap: 'Mua mới'
                },
                {
                    maNhap: 'duoc-tang',
                    tenNhap: 'Được tặng'
                }
            ],
            kieuNhap: ''
        }
    }

    handleCancel = () => {
        this.props.form.resetFields();
        this.props.handleCancel();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let ttNhapKho = this.props.nhapkho;
                let data = {
                    kieuNhap: values.kieuNhap,
                    maNhaCungCap: this.props.maNhaCungCap,
                    diaDiemGiao: values.diaDiem,
                    lstThietBi: ttNhapKho
                }

                let res = await nhapKhoHangLoat(data);
                if (res) {
                    let { dispatch } = this.props;
                    dispatch({
                        type: 'UPDATE_NHAPKHO_DATA',
                        item: []
                    })
                    this.handleCancel();
                    history.push('/app/selected-ncc');
                }
            }
        });
    }

    handleChangeKieuNhap = (value) => {
        this.setState({ kieuNhap: value })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div>
                <Modal
                    onCancel={this.handleCancel}
                    title={"Xác nhận nhập kho"}
                    visible={this.props.visibleModal}
                    footer={[
                        <Button form="form_submit_nhapkho" key="submit" type="primary" htmlType="submit">
                            Submit </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                            Đóng </Button>
                    ]}
                >
                    <Form id="form_submit_nhapkho" {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            hasFeedback
                            label="Kiểu nhập"
                        >
                            {getFieldDecorator('kieuNhap', {
                                rules: [{
                                    required: true, message: 'Chọn kiểu nhập'
                                }],
                            })(
                                <Select placeholder="Kiểu nhập" style={{ width: '100%' }} onChange={this.handleChangeKieuNhap}>
                                    {
                                        this.state.lstNhap.map(element => {
                                            return <Option key={element.maNhap} value={element.maNhap}>{element.tenNhap}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Địa điểm giao nhận"
                        >
                            {getFieldDecorator('diaDiem', {
                                rules: [{ required: true, message: 'Vui lòng nhập địa điểm giao nhận!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const CommitForm = Form.create({ name: 'register' })(CommitAdd);

export default connect(function (state) {
    return { nhapkho: state.nhapkho }
})(CommitForm);