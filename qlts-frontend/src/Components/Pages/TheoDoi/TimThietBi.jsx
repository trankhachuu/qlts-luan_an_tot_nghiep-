import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Empty, Spin } from 'antd';
import { thongTinChiTietThietBi } from '../../../Services/api';
import history from "../../../Utils/history";
import TheoDoi from './TheoDoi';
import { checknotString, checkKyTuDacBiet } from '../../../Utils/ValidateForm/NhapKhoValidate';
var moment = require('moment');

class TimThietBi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maThietBi: null,
            thongTinThietBi: null,
            isLoadding: false
        }
    }


    getThongTinThietBi = async (key) => {
        let info = await thongTinChiTietThietBi(key);
        console.log(info)
        this.setState({
            thongTinThietBi: info,
            maThietBi: key
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    isLoadding: true,
                    thongTinThietBi: null
                })
                setTimeout(() => {
                    this.getThongTinThietBi(values.maThietBi);
                    this.setState({
                        isLoadding: false
                    })
                }, 1000)
            }
        });
    }

    pushToChiTiet = (maThietBi) => {
        history.push("/app/theodoi/" + maThietBi);
    }

    showTT = (thongTinThietBi) => {
        return (
            <div>
                <div className="item-tt-tb"><span className="lable_tt">Tên thiêt bị: </span> {thongTinThietBi.tenThietBi} <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Mã thiết bị: </span> {`NCC${thongTinThietBi.maLoai}${thongTinThietBi.maTB}`} <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Bảo hành: </span> {thongTinThietBi.baoHanh} tháng <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Giá trị: </span> {thongTinThietBi.giaTri} VNĐ <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Khấu hao: </span> {thongTinThietBi.khauHao} % <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Ngày nhập: </span> {moment(thongTinThietBi.ngayNhap).format("DD/MM/YYYY")}<br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Tình trạng thiết bị: </span> {thongTinThietBi.trangThai}</div>
            </div>
        )
    }

    componentDidMoutFace = async () => {
        await this.setState({
            maThietBi: this.props.match.params.id
        });

        if (this.props.match.params.id) {
            this.setState({
                isLoadding: true,
                thongTinThietBi: null
            })
            setTimeout(() => {
                this.getThongTinThietBi(this.props.match.params.id);
                this.setState({
                    isLoadding: false
                })
            }, 1000)
        }
    }

    componentDidMount() {
        this.componentDidMoutFace();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col className="custom-scroll" xs={24} sm={24} md={8} lg={8} xl={8} style={{ padding: '10px', backgroundColor: '#fff', overflowY: 'scroll', height: 'calc(100vh - 110px)' }}>
                        <div style={{ padding: '10px' }}>
                            <h3 style={{ textTransform: 'uppercase', marginBottom: '20px', fontWeight: 'bold' }}>Tìm thiết bị theo dõi</h3>
                            <Form id="searchThietBi" onSubmit={this.handleSubmit}>
                                <Form.Item style={{ marginBottom: '10px' }}
                                    hasFeedback
                                    label="Nhập mã thiết bị"
                                >
                                    {getFieldDecorator('maThietBi', {
                                        rules: [{
                                            required: true, message: 'Yêu cầu nhập mã thiết bị!',
                                        },{
                                            validator : checkKyTuDacBiet
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Form>
                            <div style={{ textAlign: 'right' }}><Button form="searchThietBi" type="primary" htmlType="submit">Tìm kiếm</Button></div>
                        </div>

                        <div style={{ paddingTop: "30px", background: '#fcfcfc', padding: '10px' }}>
                            <h3 style={{ textTransform: 'uppercase', marginBottom: '20px', fontWeight: 'bold' }}>Thông tin thiết bị</h3>
                            <div>
                                {
                                    this.state.isLoadding === true ? <Spin size="large" tip="Đang tìm kiếm thiết bị..." />
                                        :
                                        this.state.thongTinThietBi !== null
                                            ?
                                            <div>
                                                {this.showTT(this.state.thongTinThietBi)}
                                            </div>
                                            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                }

                            </div>
                        </div>
                    </Col>
                    <Col className="custom-scroll" xs={24} sm={24} md={16} lg={16} xl={16} style={{ padding: '10px', paddingLeft: '20px', backgroundColor: '#fff', overflowY: 'scroll', height: 'calc(100vh - 110px)' }}>
                        {
                            this.state.thongTinThietBi != null ?
                                <TheoDoi idThietBi={this.state.maThietBi}></TheoDoi>

                                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(TimThietBi);