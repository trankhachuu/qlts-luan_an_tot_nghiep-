import React, { Component } from "react";
import { Row, Col, Input, Select, Button, Form } from "antd";
import { getallphongban, getallnhanvienByPhongBan } from "../../../Services/apimanh1";
import { banGiaoThietBi } from "../../../Services/apimanh";
import history from '../../../Utils/history'

// import { element } from "prop-types";
import List2 from "./List";
import { connect } from "react-redux";

const Option = Select.Option;
const { TextArea } = Input;

class bangiao1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phongBan: [],
      nhanVien: [],
      maPhongBan: '',
      kieuBanGiao: false,
      maNhanVien: '',
      noidungbangiao: ''
    };
  }
  callapi = async () => {
    let phongBan = await getallphongban();
    this.setState({
      phongBan: phongBan,
    });
  };
  componentDidMount() {
    if (this.props.lstBanGiao.lst2.length === 0) {
      history.push('/app/kcbangiao');
    }
    this.callapi();
  }

  handleChangepb = async (value) => {
    let nhanVien = await getallnhanvienByPhongBan(value);
    this.setState({
      nhanVien: nhanVien,
      maPhongBan: value
    });
  };

  handleChangeKieuBanGiao = value => {
    this.setState({
      kieuBanGiao: value
    });
  }

  handleChangenv = nv => {
    this.setState({
      maNhanVien: nv
    });
  };

  getListThietBi = () => {
    var lstThietBi = [];
    for (var element of this.props.lstBanGiao.lst2) {
      for (var tb of element.lstThietBi) {
        lstThietBi = [...lstThietBi, tb];
      }
    }
    return lstThietBi;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        var b = window.confirm("Bạn có muốn hoàn tất");
        if (b == true) {
          var objectToServer = {
            kieuBanGiao: this.state.kieuBanGiao,
            maPhongBanNhan: this.state.maPhongBan,
            maNhanVien: this.state.maNhanVien,
            lstThietBi: this.getListThietBi(),
            noiDungBanGiao: this.state.noidungbangiao

          }
          let res = await banGiaoThietBi(objectToServer);
          if (res) {
            // set ds thiet bi chon la rong
            let { dispatch } = this.props;
            dispatch({
              type: 'ADD_THIETBI_BANGIAO',
              item: { lst2: [] }
            });
            
            // chuyen den trang ds ban giao
            history.push('/app/phieubangiao/' + res.maBanGiao);

          }
        }
      }
    });


  };

  render() {
    const { thietbiLoai } = this.props;
    console.log(thietbiLoai);
    const { phongBan, nhanVien } = this.state;
    //set upda form\
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
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <div>
              <h3 style={{ textAlign: 'center' }}>DANH SÁCH THIẾT BỊ BÀN GIAO</h3>

              <List2 handleClickSelect={this.changeDataInListUnSelect} lableClick="Bỏ chọn" data={this.props.lstBanGiao.lst2} />

            </div>
          </Col>

          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <h3 style={{ textAlign: 'center' }}>THÔNG TIN BÀN GIAO</h3>
            <div />
            <div style={{ backgroundColor: '#f5f5f5', paddingTop: '55px', paddingBottom: '50px' }}>

              <Form id="form_ht_bangiao" onSubmit={this.handleSubmit}>

                <Form.Item
                  {...formItemLayout}
                  hasFeedback
                  label="Kiểu bàn giao"
                >
                  {getFieldDecorator('kieuBanGiao', {
                    rules: [{
                      required: true, message: 'Chọn kiểu bàn giao!'
                    }],
                  })(
                    <Select
                      placeholder="Chọn kiểu bàn giao"
                      onChange={this.handleChangeKieuBanGiao}
                    >
                      <Option value="ca_nhan">Cá nhân</Option>
                      <Option value="don_vi">Đơn vị</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  hasFeedback
                  label="Phòng ban bàn giao"
                >
                  {getFieldDecorator('maPhongBan', {
                    rules: [{
                      required: true, message: 'Chọn phòng ban bàn giao!'
                    }],
                  })(
                    <Select
                      placeholder="Chọn phòng ban"
                      onChange={this.handleChangepb}
                    >
                      {phongBan.map(element => (
                        <Option key={element.maPhongBan} value={element.maPhongBan}>
                          {element.tenPhongBan}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  hasFeedback
                  label="Cá nhân nhận bàn giao"
                >
                  {getFieldDecorator('maNhanVien', {
                    rules: [{
                      required: true, message: 'Chọn người nhận bàn giao!'
                    }],
                  })(
                    <Select
                      placeholder="Chọn Nhân viên"
                      onChange={this.handleChangenv}
                    >
                      {nhanVien.map(element => (
                        <Option key={element.maNhanVien} value={element.maNhanVien}>
                          {element.tenNhanVien}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  hasFeedback
                  label="Nội dung bàn giao"
                >
                  {getFieldDecorator('noidungbangiao', {
                    rules: [{
                      required: true, message: 'Nội dung bàn giao bắt buộc!'
                    }],
                  })(
                    <TextArea />
                  )}
                </Form.Item>
              </Form>
              <div style={{ float: 'right', marginRight: '22px' }}>
                <Button form="form_ht_bangiao" key="submit" type="primary" htmlType="submit">
                  Hoàn tất bàn giao </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

var form = Form.create({ name: 'dynamic_form_item' })(bangiao1)

export default connect(function (state) {
  return {
    lstBanGiao: state.lstBanGiao
  }
})(form);
