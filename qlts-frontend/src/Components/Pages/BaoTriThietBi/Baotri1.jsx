import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { getAllTinhTrang, getThongTInTHietBi, lapDanhSachThietBiBaoTri } from '../../Services/aipNam';
import history from '../../../Utils/history';
const Search = Input.Search;

class Baotri extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ttThietBi: null,
            lstThietBi: []
        };
    }
    handleChange = async (ma, value) => {
        console.log(`Mã thiết bị ${ma} - ${value}`);
        var obj = this.state.lstThietBi.find(element => {
            return element.maThietBi === ma;
        });

        obj = { ...obj, maTT: value };

        var lstTB = this.state.lstThietBi.filter(element => {
            return element.maThietBi !== ma
        });

        await this.setState({
            lstThietBi: [...lstTB, obj]
        });

        console.log(this.state.lstThietBi)
    }


    getDataFromServer = async () => {
        let tts = await getAllTinhTrang();
        this.setState({
            tinhTrangs: tts
        });
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    handleOnSearch = async (value) => {
        let ttThietBi = null;
        if (Number.isInteger(parseInt(value)) === true) {
            ttThietBi = await getThongTInTHietBi(value);
            this.setState({
                ttThietBi: ttThietBi
            })
        } else {
            alert("Mã thiết bị yêu cầu nhập số");
        }
    }

    showTT = (ttThietBi) => {
        return (
            <div>
                <div className="item-tt-tb"><span className="lable_tt">Tên thiêt bị: </span> {ttThietBi.tenThietBi} <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Mã thiết bị: </span> {ttThietBi.maThietBi} <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Bảo hành: </span> {ttThietBi.baoHanh} tháng <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Giá trị: </span> {ttThietBi.giaTri} <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Khấu hao: </span> {ttThietBi.khauHao} <br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Ngày nhập: </span> {ttThietBi.ngayNhap}<br /></div>
                <div className="item-tt-tb"><span className="lable_tt">Tình trạng thiết bị: </span> {ttThietBi.tenTinhTrang}</div>
            </div>
        )
    }

    handleSElected = async () => {
        await this.setState({
            lstThietBi: [...this.state.lstThietBi, this.state.ttThietBi],
            ttThietBi: null
        });
    }

    handleCapnhat = async () => {
        alert(1)
    }



    render() {

        return (
            <div>
                <Row>
                    <Col span={12}>
                        <div style={{ textAlign: "center" }}>
                            <h2>Nhập mã thiết bị</h2>
                            <Search
                                placeholder="Mời bạn nhập mã"
                                onSearch={value => this.handleOnSearch(value)}
                                enterButton
                                style={{ width: '300px', marginTop: '1px' }}
                            />

                            <br /><br />
                            <div style={{ marginLeft: '20%', marginRight: '20%', borderBottom: '1px solid #4caf50' }}>
                            </div>
                        </div>

                        <div style={{ paddingTop: "30px", width: '300px', margin: '0 auto' }}>
                            <h2>Thông tin thiết bị</h2>
                            <div style={{ marginBottom: '5px' }}>
                                {
                                    this.state.ttThietBi !== null ?
                                        this.showTT(this.state.ttThietBi)
                                        : 'Vui lòng nhập mã thiết bị'
                                }
                            </div>
                            {
                                this.state.ttThietBi !== null && this.state.ttThietBi.maTinhTrang === 'TT01' ?
                                    <Button onClick={this.handleSElected} type="primary" style={{ marginLeft: '80%', marginRight: '20%' }}>Chọn</Button>
                                    : ''
                            }

                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <h2>Thiết bị bảo trì</h2>
                            {
                                this.state.lstThietBi.map(element => {
                                    return (
                                        <div key={element.maThietBi}>
                                            <p><u style={{ color: 'green' }}>{element.maThietBi}</u>    {element.tenThietBi}</p>
                                        </div>
                                    )
                                })
                            }

                            <Button onClick={this.handleCapnhat} type="primary">Cập nhật thông tin</Button>

                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Baotri;