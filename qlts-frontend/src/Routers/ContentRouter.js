import React from 'react';
import { Switch, Route } from "react-router-dom";
import Users from '../Components/Pages/Users';
import Function from '../Components/Pages/Function';
import Group from '../Components/Pages/Group';
import NhanVien from '../Components/Pages/NhanVien';
import Chucvu from '../Components/Pages/Chucvu';
import TinhTrang from '../Components/Pages/TinhTrang';
import Donvitinh from '../Components/Pages/Donvitinh';
import Permission from '../Components/Pages/Permission';
import PhongBan from '../Components/Pages/PhongBan';
import DeviceRequirement from '../Components/Pages/DeviceRequirement/DeviceRequirement';
import SeeDetailedList from '../Components/Pages/DeviceRequirement/SeeDetailedList';
import NhapKho from '../Components/Pages/NhapKho/NhapKhoVer2';
import NhapKho1 from '../Components/Pages/NhapKho/NhapKho';
import DefaultPage from '../Components/Dashboard/DefaultPage';
import NoMatch from '../Components/ErrorPage/NoMatch';
import AuthorizedRoute from './AuthorizedRoute';
import ListBienNhan from '../Components/Pages/NhapKho/ListBienNhan';
import Bangiao from '../Components/Pages/bangiao/kcbangiao';
import bangiao1 from '../Components/Pages/bangiao/htbangiao';
import RotationType from '../Components/Pages/RotationPage/RotationType';
import ListRotationType from '../Components/Pages/RotationPage/ListRotationType';
import Baotri from '../Components/Pages/BaoTriThietBi/Baotri';
import DanhSachPhieuBaoTri from '../Components/Pages/BaoTriThietBi/DanhSachPhieuBaoTri';
import DanhSachPhieuBienNhan from '../Components/Pages/NhapKho/DanhSachPhieuBienNhan';
import loaithietbi from '../Components/Pages/loaithietbi';
import Nhacungcap from '../Components/Pages/Nhacungcap';
import CommitAdd from '../Components/Pages/NhapKho/CommitAdd';
import SelectedNhaCungCap from '../Components/Pages/NhapKho/SelectedNhaCungCap';
import TheoDoi from '../Components/Pages/TheoDoi/TheoDoi';
import TimThietBi from '../Components/Pages/TheoDoi/TimThietBi';
import DanhSachLuanChuyen from '../Components/Pages/TheoDoi/DanhSachLuanChuyen';
import DisPlayThietBi from '../Components/Pages/DisPlayThietBi';
import ThietBiThuocNhanVien from '../Components/Pages/ThietBiThuocNhanVien';
import HoaDonBanGiao from '../Components/Pages/InHoaDon/HoaDonBanGiao';
// import  Module  from '../Components/Pages/Module';

export default () => (
    <Switch>
        <Route exact path="/" component={DefaultPage} />
        <AuthorizedRoute exact path="/app/user" component={Users} />
        {/* <Route exact path="/app/module" component={Module} /> */}
        <AuthorizedRoute exact path="/app/function" component={Function} />
        <AuthorizedRoute exact path="/app/group" component={Group} />
        <AuthorizedRoute exact path="/app/employee" component={NhanVien} />
        <AuthorizedRoute exact path="/app/phongban" component={PhongBan} />
        <AuthorizedRoute exact path="/app/chucvu" component={Chucvu} />
        <AuthorizedRoute exact path="/app/tinhtrang" component={TinhTrang} />
        <AuthorizedRoute exact path="/app/donvitinh" component={Donvitinh} />
        <AuthorizedRoute exact path="/app/permission/:id" component={Permission} />
        <AuthorizedRoute exact path="/app/yeucauthietbi" component={DeviceRequirement} />
        <AuthorizedRoute exact path="/app/seedetailslist" component={SeeDetailedList} />
        <AuthorizedRoute exact path="/app/nhapkho/:id" component={NhapKho} />
        <AuthorizedRoute exact path="/app/danhsachnhap" component={ListBienNhan} />
        <AuthorizedRoute exact path="/app/danhsachnhap/:id" component={ListBienNhan} />
        <AuthorizedRoute exact path="/app/error404" component={NoMatch} />
        <AuthorizedRoute exact path="/app/kcbangiao" component={Bangiao} />
        <AuthorizedRoute exact path="/app/htbangiao" component={bangiao1} />
        <AuthorizedRoute exact path="/app/rotationtype" component={RotationType} />
        <AuthorizedRoute exact path="/app/listrotationtype" component={ListRotationType} />
        <AuthorizedRoute exact path="/app/baotri" component={Baotri} />
        <AuthorizedRoute exact path="/app/dsphieubaotri" component={DanhSachPhieuBaoTri} />
        <AuthorizedRoute exact path="/app/dsphieubaotri/:id" component={DanhSachPhieuBaoTri} />
        <AuthorizedRoute exact path="/app/dsphieubiennhan" component={DanhSachPhieuBienNhan} />
        <AuthorizedRoute exact path="/app/dsphieubiennhan/:id" component={DanhSachPhieuBienNhan} />
        <AuthorizedRoute exact path="/app/loaitb" component={loaithietbi} />
        <AuthorizedRoute exact path="/app/nhacungcap" component={Nhacungcap} />
        <AuthorizedRoute exact path="/app/selected-ncc" component={SelectedNhaCungCap} />
        <AuthorizedRoute exact path="/app/theodoi/:id" component={TheoDoi} />
        <AuthorizedRoute exact path="/app/ttheodoi" component={TimThietBi} />
        <AuthorizedRoute exact path="/app/ttheodoi/:id" component={TimThietBi} />
        <AuthorizedRoute exact path="/app/phieubangiao/:id" component={DanhSachLuanChuyen} />
        <AuthorizedRoute exact path="/app/phieubangiao" component={DanhSachLuanChuyen} />
        <AuthorizedRoute exact path="/app/kho" component={DisPlayThietBi} />
        <AuthorizedRoute exact path="/app/dstb-by-nhanvien/:id" component={ThietBiThuocNhanVien} />
        <Route exact path="/app/hoadon-bangiao/:id" component={HoaDonBanGiao} />
        <AuthorizedRoute component={NoMatch} />
    </Switch>
)