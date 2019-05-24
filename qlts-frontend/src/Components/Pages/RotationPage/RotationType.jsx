import React, { Component } from 'react';
import { Row, Col, Select, Icon, Form, Input, message, Button } from 'antd';
import { getAllPhongBan, getAllLoaiThietBi, getAllLoaiTbPhongBan, getThietBiTheoLoai, getNhanVienRefPhongBan, getThietBiOfNhanVien, updateNhanVienRefThietBi } from '../../../Services/apiHuu';
import { actFetchPhongBans, actFetchThietBi } from './../../../Reducers/actions/index';
import { connect } from 'react-redux';
import List2 from './List2';
import history from '../../../Utils/history.js';
import { checkDaiQua255KyTu } from '../../../Utils/ValidateForm/NhapKhoValidate';

const { TextArea } = Input;

const Option = Select.Option;
class RotationType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaiThietBis: [],
            phongbanloai: [],
            listSelect: [],
            lst1: [],
            keyPhongBan: null,
            keyLoai: '',
            PhongBan: [],
            NhanVienPhongbans: [],
            lstThietBiOfNhanVien: [],

            maNhanVien: null,
            maPhongBan: '',
            kieuBanGiao: '',
        }
    }

    getAllPhongBan = async () => {
        let data = await getAllPhongBan();
        this.props.fetchAllPhongBans(data);
        this.setState({
            PhongBan: data
        })
    }

    getAllLoaiThietBi = async () => {
        let data = await getAllLoaiThietBi();
        this.setState({
            loaiThietBis: data
        });
    }

    componentDidMount() {
        this.getAllPhongBan();
        this.getAllLoaiThietBi();
    }

    handleChange = async (value) => {
        if (value) {
            this.setState({
                keyPhongBan: value
            });
            let res = await getAllLoaiTbPhongBan(value);

            // lọc bỏ những theiest bị nhân viên đã sở hữu
            res = this.filterDataLoadThietBiOfNhanVien(res);

            //lọc bỏ những thiết bị người dùng đã chọn và lưu vào state
            this.setState({
                lst1: this.filterDataLoad(res)
            });
        }
    }

    filterDataLoad = (data) => {
        var { thietbis } = this.props;
        let ThietBiChon = [];
        thietbis.forEach(element => {
            var { options } = element;
            options.forEach(item => {
                ThietBiChon = [...ThietBiChon, item.value]
            });
        });
        var returnDSthietbi = [];
        data.forEach(elememt => {
            var { options } = elememt;
            options = options.filter(e => {
                return ThietBiChon.includes(e.value) === false;
            })
            returnDSthietbi = [...returnDSthietbi, { ...elememt, options: options }]
        })
        return returnDSthietbi;
        // 2 cái không cùng trỏ về một vùng nhớ chỉ là khi khởi tạo nó giống nhau mà thôi 
        // tóm lại 2 object nó khác nhau chỉ có điều khi khởi tạo giá trị của nó giống nhau mà thôi 
    }

    filterDataLoadThietBiOfNhanVien = (data) => {
        var { lstThietBiOfNhanVien } = this.state;

        var returnDSthietbi = [];
        data.forEach(elememt => {
            var { options } = elememt;
            options = options.filter(e => {
                return lstThietBiOfNhanVien.includes(parseInt(e.value)) === false;
            })
            returnDSthietbi = [...returnDSthietbi, { ...elememt, options: options }]
        })

        return returnDSthietbi;
        // 2 cái không cùng trỏ về một vùng nhớ chỉ là khi khởi tạo nó giống nhau mà thôi 
        // tóm lại 2 object nó khác nhau chỉ có điều khi khởi tạo giá trị của nó giống nhau mà thôi 
    }

    handleChangetwo = async (value) => {
        if (value) {
            var { keyPhongBan } = this.state;
            this.setState({
                keyLoai: value
            })
            let res = await getThietBiTheoLoai(keyPhongBan, value);
            this.setState({
                lst1: this.filterDataLoad(res)
            });
        }
    }

    disabledSelect = () => {
        if (this.state.keyLoai != '') {
            return true;
        } else {
            return false;
        }
    }

    onhanderClick = (key) => {
        var { lst1 } = this.state;
        var { thietbis } = this.props;
        var index = 0;
        var lstTBnew = [];
        for (var element of lst1) {
            var objectCanTim = element.options.find(e => {
                return e.value.toString() === key.toString();
            })
            if (objectCanTim) {
                var tenLoaiTB = element.label;
                var maLoaiTB = element.value;
                var objectLoaitim = thietbis.find(elememt2 => {
                    return elememt2.label.toString() === tenLoaiTB.toString();
                })
                if (!objectLoaitim) {
                    thietbis = [...thietbis, { label: tenLoaiTB, value: maLoaiTB, options: [objectCanTim] }]
                } else {
                    thietbis = thietbis.filter(element => {
                        return element.label !== objectLoaitim.label;
                    });
                    objectLoaitim = { ...objectLoaitim, options: [...objectLoaitim.options, objectCanTim] };
                    thietbis = [...thietbis, objectLoaitim];
                }
                lstTBnew = element.options.filter(element => {
                    return element.value !== objectCanTim.value;
                });
                lst1[index].options = lstTBnew;
                lst1 = lst1.filter(element => {
                    return element.options.length !== 0;
                })
                this.setState({ lst1: lst1, thietbis: thietbis });
                this.props.fetAllThietBi(thietbis);
                break;
            }
            index++;
        };
    }

    changeDataInListUnSelect = key => {
        var { lst1 } = this.state;
        var { thietbis } = this.props;

        var index = 0;
        for (var element of thietbis) {
            var objectCanTim = element.options.find(e => {
                return e.value.toString() === key.toString();
            });
            if (objectCanTim) {
                var tenLoaiTB = element.label;
                var maLoaiTB = element.value;
                var objectLoaitim = lst1.find(elememt2 => {
                    return elememt2.label.toString() === tenLoaiTB.toString();
                })
                if (!objectLoaitim) {
                    lst1 = [
                        ...lst1,
                        { label: tenLoaiTB, value: maLoaiTB, options: [objectCanTim] }
                    ];
                } else {
                    lst1 = lst1.filter(element => {
                        return element.label !== objectLoaitim.label;
                    });
                    objectLoaitim = { ...objectLoaitim, options: [...objectLoaitim.options, objectCanTim] };
                    lst1 = [...lst1, objectLoaitim];
                }
                var lstTBNew = element.options.filter(element => {
                    return element.value !== objectCanTim.value;
                });
                thietbis[index].options = lstTBNew;
                thietbis = thietbis.filter(element => {
                    return element.options.length !== 0;
                })
                this.setState({ lst1: lst1 });
                this.props.fetAllThietBi(thietbis);
                break;
            }
            index++;
        }
    }

    //

    handleChangenv = async (value) => {
        let lstThietBiOfNhanVien = await getThietBiOfNhanVien(value);

        await this.setState({
            maNhanVien: value,
            lstThietBiOfNhanVien: lstThietBiOfNhanVien,
            lst1: [],
        });

        if (this.state.keyPhongBan != null) {
            let res = await getAllLoaiTbPhongBan(this.state.keyPhongBan);
            // lọc bỏ những theiest bị nhân viên đã sở hữu
            res = this.filterDataLoadThietBiOfNhanVien(res);

            //lọc bỏ những thiết bị người dùng đã chọn và lưu vào state
            this.setState({
                lst1: this.filterDataLoad(res)
            });
        }

        this.props.fetAllThietBi([]);
    }

    handleChangeKieuBanGiao = (value) => {
        this.setState({
            kieuBanGiao: value
        })
    }

    handleChangepb = async (value) => {
        let NhanVienPhongban = await getNhanVienRefPhongBan(value);
        this.setState({
            NhanVienPhongbans: NhanVienPhongban,
            maPhongBan: value
        });
    }

    onbSubmit = async (e) => {

        //get Lst thietbi to lst Long ma Thietbi
        var { thietbis } = this.props;
        let ThietBiChon = [];
        thietbis.forEach(element => {
            var { options } = element;
            options.forEach(item => {
                ThietBiChon = [...ThietBiChon, item.value]
            });
        });

        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.state.NhanVienPhongbans.length > 0) {
                    var { kieuBanGiao, maNhanVien } = this.state;
                    var dataSend = { maPhongBanNhan: values.maPhongBan, maNhanVien: maNhanVien, kieuBanGiao: kieuBanGiao, lstThietBi: ThietBiChon, noiDungBanGiao: values.noidungbangiao };
                    let res = await updateNhanVienRefThietBi(dataSend);
                    if(res){
                        this.props.fetAllThietBi([]);
                        history.push('/app/phieubangiao/' + res.maBanGiao);
                    }
                    
                } else {
                    message.error('Chọn nhân viên nhận bàn giao trước');
                }
            } else {
                message.error('Nhập đầy đủ thông tin trước!');
            }
        });
    }

    render() {
        var { loaiThietBis, lst1 } = this.state;
        var phongBans = this.props.phongban;
        var { PhongBan, NhanVienPhongbans } = this.state;
        //set upda form
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col xs={6} sm={5} md={6} lg={6} xl={6} style={{ background: '#fcfcfc', paddingLeft: '10px', paddingRight: '10px' }}>
                        <h3 style={{ fontSize: '20px', borderBottom: '2px solid #4caf50', padding: '10px', textTransform: 'uppercase' }}>Thông tin chuyển</h3>
                        <Form id="form_ht_bangiao" onSubmit={this.onbSubmit}>

                            <Form.Item
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
                                        {PhongBan.map(element => (
                                            <Option key={element.maPhongBan} value={element.maPhongBan}>
                                                {element.tenPhongBan}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                label="Cá nhân nhận bàn giao"
                            >
                                {getFieldDecorator('maNhanVien', {
                                    rules: [{
                                        required: true, message: 'Chọn người nhận bàn giao!'
                                    }],
                                })(
                                    NhanVienPhongbans.length > 0 ?
                                        <Select
                                            placeholder="Chọn Nhân viên"
                                            onChange={this.handleChangenv}
                                        >
                                            {NhanVienPhongbans.map(element => (
                                                <Option key={element.maNhanVien} value={element.maNhanVien}>
                                                    {element.tenNhanVien}
                                                </Option>
                                            ))}
                                        </Select>
                                        :
                                        <Select
                                            disabled
                                            placeholder="Chọn Nhân viên"
                                            onChange={this.handleChangenv}
                                        >
                                        </Select>
                                )}
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                label="Nội dung bàn giao"
                            >
                                {getFieldDecorator('noidungbangiao', {
                                    rules: [{
                                        required: true, message: 'Nội dung bàn giao bắt buộc!'
                                    }, {
                                    validator : checkDaiQua255KyTu
                                }],
                                })(
                                    <TextArea />
                                )}
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                        <h3 style={{ fontSize: '20px', borderBottom: '2px solid #4caf50', padding: '10px', textTransform: 'uppercase' }}>Chọn thiết bị</h3>
                        {
                            this.state.maNhanVien !== null ?
                                <div style={{ marginRight: '5px' }}>
                                    <div style={{ marginBottom: '10px', height: '30px' }}>
                                        <Select
                                            style={{ width: '45%', marginRight: 10 }}
                                            placeholder="Phòng Ban"
                                            disabled={this.disabledSelect()}
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {phongBans.map(element => <Option key={element.maPhongBan} value={element.maPhongBan}>{element.tenPhongBan}</Option>)}
                                        </Select>
                                        <Select
                                            showSearch
                                            style={{ width: '45%' }}
                                            placeholder="Loại thiết bị"
                                            optionFilterProp="children"
                                            onChange={this.handleChangetwo}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {loaiThietBis.map(element => <Option key={element.maLoai} value={element.maLoai}>{element.tenLoai}</Option>)}
                                        </Select>
                                    </div>
                                    <List2 handleClickSelect={this.onhanderClick} lableClick="Chọn" data={lst1} />
                                </div>
                                :
                                'Nhập thông tin nhân viên trước'
                        }
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} >
                        <h3 style={{ fontSize: '20px', borderBottom: '2px solid #4caf50', padding: '10px', textTransform: 'uppercase' }}>Danh sách chọn</h3>
                        <div style={{ marginTop: '50px' }}>
                            <List2 handleClickSelect={this.changeDataInListUnSelect} lableClick="Bỏ chọn" data={this.props.thietbis} />
                            {
                                this.props.thietbis.length > 0 ?
                                    <Button form="form_ht_bangiao" key="submit" htmlType="submit" type="primary" style={{ position: 'absolute', right: '5px', marginTop: '20px' }}>
                                        Hoàn tất chọn <Icon type="right" />
                                    </Button>
                                    :
                                    ''
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        phongban: state.phongban,
        thietbis: state.thietbis,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllPhongBans: (phongban) => {
            dispatch(actFetchPhongBans(phongban));
        },
        fetAllThietBi: (thietbis) => {
            dispatch(actFetchThietBi(thietbis))
        }
    }
}

var form = Form.create({ name: 'dynamic_form_item' })(RotationType)
export default connect(mapStateToProps, mapDispatchToProps)(form);

