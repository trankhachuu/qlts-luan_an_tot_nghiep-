import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Badge, Select, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAllNhanVien, getAllPhongBan, getDanhSachThietBi, updateNhanVienRefThietBi, getNhanVienRefPhongBan } from '../../../Services/apiHuu';
import { actFetchThietBi } from './../../../Reducers/actions/index';


const Option = Select.Option;

class ListRotationType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NhanVien: [],
            PhongBan: [],
            DanhSachTB: [],
            maNhanVien: '',
            maPhongBan: '',
            kieuBanGiao: 0,
            NhanVienPhongbans: [],
            mathietbis: [],
        }
    }

    getAllNhanVien = async () => {
        var data = await getAllNhanVien();
        this.setState({
            NhanVien: data
        });
    }

    getAllPhongBan = async () => {
        let data = await getAllPhongBan();
        this.setState({
            PhongBan: data
        });
    }

    getDanhSachThietBi = async () => {
        let res = await getDanhSachThietBi();
        this.setState({
            DanhSachTB: res
        });
    }

    componentDidMount() {
        this.getAllNhanVien();
        this.getAllPhongBan();
        this.getDanhSachThietBi();
    }

    convertCodeByName = (id) => {
        if (this.state.DanhSachTB.length > 0) {
            let objDS = this.state.DanhSachTB.find(element => element.maThietBi === id);
            return objDS.tenLoai;
        } else {
            return 'n/a'
        }

    }

    handleChangeDVT = (value) => {
        this.setState({
            maDonViTinh: value
        });
    }

    handleChangeNV = (value) => {
        this.setState({
            maNhanVien: value
        });
    }

    handleChangePB = async (value) => {
        let NhanVienPhongban = await getNhanVienRefPhongBan(value);
        this.setState({
            NhanVienPhongbans: NhanVienPhongban
        });
        this.setState({
            maPhongBan: value
        });
    }

    handleChangeBG = (value) => {
        this.setState({
            kieuBanGiao: value
        })
    }

    disabledSelectDonVi = () => {
        var { kieuBanGiao } = this.state;
        if (kieuBanGiao === 0) {
            return true;
        } else {
            return false;
        }
    }



    disabledSelectCaNhan = () => {
        var { kieuBanGiao, maPhongBan } = this.state;
        if (kieuBanGiao === 1 && maPhongBan) {
            return false;
        } else if (kieuBanGiao === 1) {
            return true;
        }
        else {
            return false;
        }

    }

    getListThietBi = () => {
        var lstThietBi = [];
        console.log(this.props.thietbis);
        for (var element of this.props.thietbis) {
            for (var tb of element.options) {
                lstThietBi = [...lstThietBi, tb.value];
            }
        }
        console.log(lstThietBi)
        return lstThietBi;
    }

    onRotation = async () => {
        var list = await this.getListThietBi();
        console.log(list)
        var { kieuBanGiao, maNhanVien } = this.state;
        var dataSend = { maNhanVien: maNhanVien, kieuBangiao: kieuBanGiao, lstThietBi: [...list] };
        console.log(dataSend);
        let data = await updateNhanVienRefThietBi(dataSend);
        console.log(data)
        this.props.fetAllThietBi([]);
    }

    onComeBack = () => {
        this.props.fetAllThietBi([]);
    }

    render() {
        var { PhongBan, NhanVien, maPhongBan, NhanVienPhongbans, mathietbis } = this.state;
        var nhanviens = !maPhongBan ? NhanVien : NhanVienPhongbans;
        var { thietbis } = this.props;
        var dataList = thietbis.map((element, index) => {
            return (
                <div key={index}>
                    <button className="collapsible">{`[${element.value}] ${element.label}`}</button>
                    <div className="content">
                        {
                            element.options.map(element1 => {
                                return (
                                    <div key={element1.value} className="sub-item">
                                        <h3>
                                            <Badge
                                                count={`Mã: ${element1.value}`}
                                                style={{ backgroundColor: "#52c41a" }}
                                            />
                                            <Badge
                                                count={`${element1.label}`}
                                                style={{
                                                    backgroundColor: "#f1f1f1",
                                                    color: "rgb(0, 160, 209)",
                                                    fontWeight: "bold",
                                                    fontSize: "15px"
                                                }}
                                            />
                                        </h3>
                                        <span>{element1.tenTinhTrang}</span>
                                        <br />
                                        <span className="mota">{element1.moTa}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Row type="flex" justify="start">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px' }}>
                        <div style={{ top: '50%', left: ' 50%', marginRight: '30%', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '25px', borderBottom: '2px solid #4caf50', marginBottom: '50px', padding: ' 13px 0' }}>Danh sách thiết bị luân chuyển</h3>
                        </div>
                        <div style={{ margin: '50px', }}>
                            {dataList}
                        </div>
                        <div className="btn pull-left" style={{ marginTop: '30px' }}>
                            <Link to="/app/rotationtype" onClick={() => this.onComeBack()} className="btn btn-primary"><Icon type="left" />Chọn lại</Link>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: '10px' }}>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        thietbis: state.thietbis,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetAllThietBi: (thietbis) => {
            dispatch(actFetchThietBi(thietbis))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListRotationType)
