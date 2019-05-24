import React, { Component } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { theoDoiThietBi } from '../../../Services/api';
import { Divider, Col, Row } from 'antd';
var moment = require('moment');

class TheoDoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idThietBi: null,
            lstNode: []
        }
    }


    getData = async (idThietBi) => {
        // function call server
        if (idThietBi !== null) {
            let data = await theoDoiThietBi(idThietBi);
            this.setState({ lstNode: data });
        }
    }

    componentDidMount() {
        // get id thiet bi
        let idThietBi = this.props.idThietBi

        // fecth lst node from server
        this.setState({ idThietBi: idThietBi });
        this.getData(idThietBi);
    }


    customDate = (tuNgay, denNgay) => {
        let tuNgayOut = moment(tuNgay).format("DD/MM/YYYY");
        let denNgayout = denNgay !== null ? moment(denNgay).format("DD/MM/YYYY") : "Hiện tại"
        return (
            <div>{tuNgayOut}{" - " + denNgayout}</div>
        );
    }

    mapNodeTimeLine = () => {
        // map node to view
        return this.state.lstNode.map(element => {
            var tenPhieu = element.type === "luan_chuyen" ? "Mã phiếu bàn giao PBG" : element.type === "kho" ? "Mã phiếu biên nhận " : "Mã phiếu bảo trì PBT";
            var subtitle = element.type === "luan_chuyen" ? "Thiết bị đã bị luân chuyển" : element.type === "kho" ? "Thiết bị được nhập kho " : "Thiết bị được bảo trì/sửa chữa";
            if (element.type === "luan_chuyen") {
                return (
                    <TimelineItem
                        key={element.id}
                        dateText={this.customDate(element.tuNgay, element.denNgay)}
                        dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
                        bodyContainerStyle={{
                            background: '#fefefe',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h3>{subtitle}</h3>
                        <h4>{`${element.tenInNode}`}</h4>
                        <Divider />
                        <p>{`${tenPhieu}${element.maPhieu}`}</p>
                        <p>{`Phòng ban hiện tại ${element.tenDonVi}`}</p>
                    </TimelineItem>
                );
            } else if(element.type === "thu_hoi"){
                return (
                    <TimelineItem
                        key={element.id}
                        dateText={this.customDate(element.tuNgay, element.denNgay)}
                        dateInnerStyle={{ background: '#e86971', color: '#000' }}
                        bodyContainerStyle={{
                            background: '#ddd',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h3>{subtitle}</h3>
                        <h4>{`${element.tenInNode}`}</h4>
                        <Divider />
                        <p>{`${tenPhieu}${element.maPhieu}`}</p>
                        <p>{`Phòng ban hiện tại ${element.tenDonVi}`}</p>
                    </TimelineItem>
                )
            }
            else {
                return (
                    <TimelineItem
                        key={element.id}
                        dateText={this.customDate(element.tuNgay, element.denNgay)}
                        dateInnerStyle={{ background: '#e86977', color: '#000' }}
                        bodyContainerStyle={{
                            background: '#ddd',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h3>{subtitle}</h3>
                        <h4>{`${element.tenInNode}`}</h4>
                        <Divider />
                        <p>{`${tenPhieu}${element.maPhieu}`}</p>
                        <p>{`Phòng ban hiện tại ${element.tenDonVi}`}</p>
                    </TimelineItem>
                )
            }
        })
    }

    render() {
        return (
            <Timeline lineColor={'#ddd'}>
                {this.mapNodeTimeLine()}
            </Timeline>
        );
    }
}

export default TheoDoi;