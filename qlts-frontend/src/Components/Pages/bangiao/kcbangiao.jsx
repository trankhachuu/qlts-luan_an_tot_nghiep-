import React, { Component } from "react";
import { Row, Col, Select, Button } from "antd";
import List2 from "./List";
import {
  getAllloaitb,
  getbyIdNCC
} from "../../../Services/apimanh";
import { getAllNhacungcap } from "../../../Services/apimanh1";
// import DualListBox from "react-dual-listbox";
// import "react-dual-listbox/lib/react-dual-listbox.css";
// import { element } from "prop-types";
import history from "../../../Utils/history";
import { connect } from "react-redux";
// import { FetAllThietBi } from "./../../../Reducers/actions/index";

const Option = Select.Option;

class Bangiao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nhaCungCap: [],
      loaiTBs: [],
      tenLoais: [],
      mancc: "",
      maloai: "",
      selected: [],
      options: [],
      lst1: [],
      lst2: []
    };
  }
  callapi = async () => {
    let loaiTBs = await getAllloaitb();
    let nhaCungCap = await getAllNhacungcap();
    this.setState({
      nhaCungCap: nhaCungCap,
      loaiTBs: loaiTBs
    });
  };

  componentDidMount() {
    this.callapi();
  }

  handleselectchangeLoai = async value => {
    let res = await getbyIdNCC(this.state.mancc, value);

    this.setState({
      lst1: this.filterDataLoad(),
      maloai: value
    });
  };

  handleselectchanngeNCC = async (value) => {
    let res = await getbyIdNCC(value, "none_value");



    this.setState({
      lst1: this.filterDataLoad(res),
      mancc: value
    });
  };

  // fillter data
  filterDataLoad = (lstLoadServer) => {
    var { lst2 } = this.props.lstBanGiao;
    let thietBiChons = [];
    lst2.forEach(element => {
      var { lstThietBi } = element;
      lstThietBi.forEach(item => {
        thietBiChons = [...thietBiChons, item.maTB]
      });
    });

    var returnObject = [];
    lstLoadServer.forEach(element => {
      var { lstThietBi } = element;
      lstThietBi = lstThietBi.filter(i => {
        return thietBiChons.includes(i.maTB) === false
      });

      returnObject = [...returnObject, { ...element, lstThietBi: lstThietBi }]
    });
    return returnObject;
  }


  onHandleClickSubmit = () => {
    var r = window.confirm("bạn có muốn chuyển trang");
    if (r === true) {
      history.push("/app/htbangiao");
    }
  };

  //n tạo 1 cái component mới để list, ko dùng cái DualListBox nữa

  //thay đổi dữ liệu khi nhấn chọn
  changeDataInList = key => {
    let { dispatch } = this.props;
    var { lst1 } = this.state;
    var { lst2 } = this.props.lstBanGiao;
    var index = 0;

    for (var element of lst1) {
      var objectCanTim = element.lstThietBi.find(e => {
        return e.maTB.toString() === key.toString();
      });

      if (objectCanTim) {
        var tenLoaiTB = element.tenLoaiThietBi;
        var maLoaiTB = element.maLoaiTB;
        var objectLoaiTim = lst2.find(
          element2 =>
            element2.tenLoaiThietBi.toString() === tenLoaiTB.toString()
        );

        if (!objectLoaiTim) {
          lst2 = [
            ...lst2,
            { tenLoaiThietBi: tenLoaiTB, maLoaiTB: maLoaiTB, lstThietBi: [objectCanTim] }
          ];
        } else {
          lst2 = lst2.filter(element => {
            return element.tenLoaiThietBi !== objectLoaiTim.tenLoaiThietBi;
          });
          objectLoaiTim = {
            ...objectLoaiTim,
            lstThietBi: [...objectLoaiTim.lstThietBi, objectCanTim]
          };
          lst2 = [...lst2, objectLoaiTim];
        }

        var lstTBNew = element.lstThietBi.filter(element => {
          return element.maTB !== objectCanTim.maTB;
        });

        lst1[index].lstThietBi = lstTBNew;

        this.setState({ lst1: lst1 });
        dispatch({
          type: 'ADD_THIETBI_BANGIAO',
          item: { lst2: lst2 }
        });
        break;
      }
      index++;
    }
    lst1 = lst1.filter(element => {
      return element.lstThietBi.length !== 0
    })
    this.setState({ lst1: lst1 });
  };


  changeDataInListUnSelect = key => {
    let { dispatch } = this.props;
    var { lst1 } = this.state;
    var { lst2 } = this.props.lstBanGiao;


    var index = 0;

    for (var element of lst2) {
      var objectCanTim = element.lstThietBi.find(e => {
        return e.maTB.toString() === key.toString();
      });

      if (objectCanTim) {
        var tenLoaiTB = element.tenLoaiThietBi;
        var maLoaiTB = element.maLoaiTB;
        var objectLoaiTim = lst1.find(
          element2 =>
            element2.tenLoaiThietBi.toString() === tenLoaiTB.toString()
        );

        if (!objectLoaiTim) {
          lst1 = [
            ...lst1,
            { tenLoaiThietBi: tenLoaiTB, maLoaiTB: maLoaiTB, lstThietBi: [objectCanTim] }
          ];
        } else {
          lst1 = lst1.filter(element => {
            return element.tenLoaiThietBi !== objectLoaiTim.tenLoaiThietBi;
          });
          objectLoaiTim = {
            ...objectLoaiTim,
            lstThietBi: [...objectLoaiTim.lstThietBi, objectCanTim]
          };
          lst1 = [...lst1, objectLoaiTim];
        }

        var lstTBNew = element.lstThietBi.filter(element => {
          return element.maTB !== objectCanTim.maTB;
        });

        lst2[index].lstThietBi = lstTBNew;
        this.setState({ lst1: lst1 });
        dispatch({
          type: 'ADD_THIETBI_BANGIAO',
          item: { lst2: lst2 }
        });
        break;
      }
      index++;
    }
    lst2 = lst2.filter(element => {
      return element.lstThietBi.length !== 0
    })
    dispatch({
      type: 'ADD_THIETBI_BANGIAO',
      item: { lst2: lst2 }
    });
  };

  render() {
    const { nhaCungCap, loaiTBs, lst1 } = this.state;
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
            <div style={{ marginRight: '5px' }}>
              <div style={{ marginBottom: '10px', height: '30px' }}>
                <Select
                  defaultValue="Nhà cung cấp"
                  style={{ width: '30%', marginRight: '1%' }}
                  onChange={this.handleselectchanngeNCC}
                >
                  {nhaCungCap.map(element => (
                    <Option key={element.maNCC} value={element.maNCC}>
                      {element.tenNCC}
                    </Option>
                  ))}
                </Select>
                {lst1.length > 0 ?
                  <Select
                    defaultValue="Loại Thiết bị"
                    style={{ width: '30%' }}
                    onChange={this.handleselectchangeLoai}

                  >
                    {loaiTBs.map(element => (
                      <Option key={element.maLoai} value={element.maLoai}>
                        {element.tenLoai}
                      </Option>
                    ))}
                  </Select>
                  :
                  <Select
                    defaultValue="Loại Thiết bị"
                    style={{ width: '30%' }}
                    onChange={this.handleselectchangeLoai}
                    disabled
                  >
                    {loaiTBs.map(element => (
                      <Option key={element.maLoai} value={element.maLoai}>
                        {element.tenLoai}
                      </Option>
                    ))}
                  </Select>
                }

              </div>
              <List2 isSelected={true} handleClickSelect={this.changeDataInList} lableClick="Chọn" data={lst1} />
            </div>
            <div />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <div style={{ height: '30px', marginBottom: '10px' }}>
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <h3 style={{ marginRight: '10px', display: 'inline-block' }}>DANH SÁCH CHỌN</h3>
                <Button
                  onClick={this.onHandleClickSubmit}
                  type="primary"
                  style={{ position: 'absolute', right: '5px' }}
                >
                  Hoàn tất chọn
                </Button>
              </div>
            </div>
            <List2 isSelected={true} handleClickSelect={this.changeDataInListUnSelect} lableClick="Bỏ chọn" data={this.props.lstBanGiao.lst2} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(function (state) {
  return {
    lstBanGiao: state.lstBanGiao
  }
})(Bangiao);
