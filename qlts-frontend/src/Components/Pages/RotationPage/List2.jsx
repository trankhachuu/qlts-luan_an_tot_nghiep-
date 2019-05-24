import React, { Component } from 'react';
import { Badge } from "antd";
import "./list.css";


class List2 extends Component {
    render() {
        var { data } = this.props;
        return (
            <div>
                {
                    data.length > 0 ?
                        this.props.data.map((element, index) => {
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
                                                        <span onClick={() => this.props.handleClickSelect(element1.value)} className="selected-item">>> {this.props.lableClick}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        ''
                }
            </div>
        );
    }
}

export default List2;