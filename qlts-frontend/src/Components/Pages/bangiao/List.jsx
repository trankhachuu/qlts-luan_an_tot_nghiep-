import React, { Component } from "react";
import { Badge, Empty } from "antd";
import "./list.css";

var dateFormat = require('dateformat');
class List extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.length > 0 ?
                        this.props.data.map(element => {
                            return (
                                <div key={element.maLoaiTB}>
                                    <button className="collapsible">{`[${element.maLoaiTB}] ${element.tenLoaiThietBi}`}</button>
                                    <div className="content">
                                        {
                                            element.lstThietBi.map(element1 => {
                                                return (
                                                    <div key={element1.maTB} className="sub-item">
                                                        <h3>
                                                            <Badge
                                                                count={`Mã: ${element1.maTB}`}
                                                                style={{ backgroundColor: "#52c41a" }}
                                                            />
                                                            <Badge
                                                                count={`${element1.tenThietBi}`}
                                                                style={{
                                                                    backgroundColor: "#f1f1f1",
                                                                    color: "rgb(0, 160, 209)",
                                                                    fontWeight: "bold",
                                                                    fontSize: "15px"
                                                                }}
                                                            />
                                                        </h3>
                                                        {/* {console.log(element1)} */}
                                                        <span>Trạng thái thiết - {element1.trangThai}</span>
                                                        <br />
                                                        <span className="mota">Ngày nhập thiết bị {dateFormat(new Date(element1.ngayNhap), "dd/mm/yyyy")} | Giá trị - {element1.giaTri} VND </span>
                                                        {
                                                            this.props.isSelected === true ?
                                                                <span onClick={() => this.props.handleClickSelect(element1.maTB)} className="selected-item">>> {this.props.lableClick}</span>
                                                                :
                                                                ''
                                                        }


                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
            </div>
        );
    }
}

export default List;
