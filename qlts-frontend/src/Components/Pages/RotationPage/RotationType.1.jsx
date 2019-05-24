import React, { Component } from 'react';
import { Row, Col, Select, Icon, Collapse } from 'antd';
import { getAllPhongBan, getAllLoaiThietBi, getAllLoaiTbPhongBan, getThietBiTheoLoai } from '../../../Services/apiHuu';
import { actFetchPhongBans, actFetchThietBi } from './../../../Reducers/actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import List2 from './List2';

const Panel = Collapse.Panel;

const Option = Select.Option;
class RotationType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaiThietBis: [],
            phongbanloai: [],
            listSelect: [],
            lst1: [],
            keyPhongBan: '',
            keyLoai: ''
        }
    }

    getAllPhongBan = async () => {
        let data = await getAllPhongBan();
        this.props.fetchAllPhongBans(data);
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
            this.setState({
                lst1: this.filterDataLoad(res)
            });
            // console.log(res);
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
        console.log(returnDSthietbi);
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

    render() {
        var { loaiThietBis, lst1 } = this.state;
        var phongBans = this.props.phongban;
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col xs={6} sm={5} md={6} lg={6} xl={6}>
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} style={{ padding: '10px' }}>
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
                    </Col>
                    <Col xs={10} sm={9} md={9} lg={9} xl={9}>
                        <div style={{ height: '30px', marginBottom: '19px' }}>
                            <div style={{ textAlign: 'center', position: 'relative' }}>
                                <h3 style={{ marginRight: '10px', display: 'inline-block' }}>DANH SÁCH CHỌN</h3>
                            </div>
                        </div>
                        <List2 handleClickSelect={this.changeDataInListUnSelect} lableClick="Bỏ chọn" data={this.props.thietbis} />
                        <Link to="/app/listrotationtype" className="btn btn-primary" style={{ position: 'absolute', right: '5px', marginTop: '30%' }}>Hoàn tất chọn<Icon type="right" /></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(RotationType);

