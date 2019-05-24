package tpm.qlts.controller;

import java.security.Principal;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import tpm.qlts.comporator.PhieuLuanChuyenComparator;
import tpm.qlts.comporator.TimeLineConporator;
import tpm.qlts.custommodels.BanGiaoData;
import tpm.qlts.custommodels.NodeInTimeLine;
import tpm.qlts.custommodels.PhieuBanGiaoChiTiet;
import tpm.qlts.custommodels.ThietBiByLoaiTB;
import tpm.qlts.custommodels.ThietBiChiTiet;
import tpm.qlts.entitys.LoaiTB;
import tpm.qlts.entitys.NhaCungCap;
import tpm.qlts.entitys.NhanVien;
import tpm.qlts.entitys.NhanVienRefThietBi;
import tpm.qlts.entitys.NhanVienRefThietBiPK;
import tpm.qlts.entitys.Notifications;
import tpm.qlts.entitys.PhieuBanGiao;
import tpm.qlts.entitys.PhieuBaoTri;
import tpm.qlts.entitys.PhongBan;
import tpm.qlts.entitys.ThietBi;
import tpm.qlts.entitys.TinhTrang;
import tpm.qlts.entitys.TinhTrangRefThietBi;
import tpm.qlts.entitys.Users;
import tpm.qlts.services.LoaiThietBiServiceByManhGa;
import tpm.qlts.services.NhaCungCapService;
import tpm.qlts.services.NhanVienRefThietBiService;
import tpm.qlts.services.NhanVienService;
import tpm.qlts.services.NotificationsService;
import tpm.qlts.services.PhieuBanGiaoService;
import tpm.qlts.services.PhieuBaoTriService;
import tpm.qlts.services.PhongBanService;
import tpm.qlts.services.ThietBiServiceByManhGa;
import tpm.qlts.services.TinhTrangRefThietBiService;
import tpm.qlts.services.TinhTrangService;
import tpm.qlts.services.UserRevice;

@Controller
@RestController
@RequestMapping("thietbi")
public class ThietBiController {

	@Autowired
	private ThietBiServiceByManhGa thietBiServices;

	@Autowired
	private LoaiThietBiServiceByManhGa loaiThietBiService;

	@Autowired
	private TinhTrangService tinhTrangService;

	@Autowired
	private NhanVienRefThietBiService nhanVienRefThietBiService;

	@Autowired
	private PhieuBanGiaoService phieuBanGiaoService;

	@Autowired
	private TinhTrangRefThietBiService tinhTrangRefThietBiService;

	@Autowired
	private NhanVienService nhanVienService;

	@Autowired
	private PhongBanService phongBanService;

	@Autowired
	private PhieuBaoTriService phieuBaoTriService;

	@Autowired
	private NhaCungCapService nhaCungCapService;

	@Autowired
	private NotificationsService notificationsService;

	@Autowired
	private UserRevice userService;

	@GetMapping("listtb")
	public List<ThietBi> getalltb() {
		return (List<ThietBi>) thietBiServices.findAll();
	}

	// get thiet bi theo nha cung cap
	@GetMapping("get-tb-by-ncc/{maNCC}/{maLoai}")
	public List<ThietBiByLoaiTB> layThietBiTheoNhaCungCap(@PathVariable String maNCC, @PathVariable String maLoai) {
		List<ThietBiByLoaiTB> lstThietBiGroupByLoai = new ArrayList<ThietBiByLoaiTB>();

		// lấy danh sách thiet bị tu bang ThietBi
		List<ThietBi> lstThietBi = null;
		if (maLoai.equals("none_value")) {
			lstThietBi = thietBiServices.getThietBiByNhaCungCap(maNCC);
		} else {
			lstThietBi = thietBiServices.getThietBiByNCCAndMaLoai(maNCC, maLoai);
		}

		// lặp qua danh sách thiêt bị
		for (ThietBi tb : lstThietBi) {
			LoaiTB loaiTB = loaiThietBiService.getLoaiThietBiFromThietBiCon(tb.getMaLoai());
			LoaiTB loaiTBCon = loaiThietBiService.findByID(tb.getMaLoai());

			ThietBiChiTiet tbs = new ThietBiChiTiet("" + maNCC + loaiTB.getMaLoai() + tb.getMaThietBi(),
					loaiTBCon.getTenLoai(), tb.getBaoHanh(), tb.getGiaTri(), tb.getKhauHao(), tb.getMaLoai(),
					tb.getNgayNhap(), tinhTrangService.getTenTinhTrangByIDThietBi(tb.getMaThietBi()));

			int check = checkInList(lstThietBiGroupByLoai, loaiTB.getMaLoai());
			if (check != -1) {
				lstThietBiGroupByLoai.get(check).getLstThietBi().add(tbs);
			} else {
				ThietBiByLoaiTB newItem = new ThietBiByLoaiTB(loaiTB.getMaLoai(), loaiTB.getTenLoai(),
						new ArrayList<ThietBiChiTiet>());

				newItem.getLstThietBi().add(tbs);
				lstThietBiGroupByLoai.add(newItem);
			}
		}
		return lstThietBiGroupByLoai;
	}

	public int checkInList(List<ThietBiByLoaiTB> lst, String maLoai) {
		for (int i = 0; i < lst.size(); i++) {
			if (lst.get(i).getMaLoaiTB().equals(maLoai)) {
				return i;
			}
		}
		return -1;
	}

	public String getTimestame() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		return String.valueOf(timestamp.getTime());
	}

	@PostMapping("ban-giao-thiet-bi")
	@Transactional
	public PhieuBanGiao banGiaoThietBi(@RequestBody BanGiaoData data, Principal principal) {
		try {
			// Create new PhieuBienNhan
			PhieuBanGiao phieuBanGiao = new PhieuBanGiao();
			phieuBanGiao.setNgayBanGiao(new Date());
			phieuBanGiao.setNguoiBanGiao(data.getMaNhanVien());
			phieuBanGiao.setNoiDungBanGiao(data.getNoiDungBanGiao());
			PhieuBanGiao phieuRes = phieuBanGiaoService.save(phieuBanGiao);

			//
			int count = 0; // dung dem so luong thiet bi
			String dsTenThietBi = ""; // dung get ten thietbi de thong bao

			// foreach lst ThietBi and add to Table NhanVienRefTheitBi
			List<NhanVienRefThietBi> lstNhanVienTB = new ArrayList<NhanVienRefThietBi>();
			List<ThietBi> lstThietBiUpdate = new ArrayList<ThietBi>();
			for (ThietBiChiTiet tb : data.getLstThietBi()) {
				long maThietBi = Long.parseLong(tb.getMaTB().substring(4));
				ThietBi tbUpdate = thietBiServices.findById(maThietBi);
				tbUpdate.setTinhTrangKho(false);

				lstThietBiUpdate.add(tbUpdate);

				NhanVienRefThietBi nvTB = new NhanVienRefThietBi(
						new NhanVienRefThietBiPK(data.getMaNhanVien(), maThietBi, phieuRes.getMaBanGiao()), new Date(),
						data.getKieuBanGiao().equals("ca_nhan") == true ? true : false, phieuRes);
				nvTB.setTimestame(this.getTimestame());
				lstNhanVienTB.add(nvTB);

				// count
				count++;
				dsTenThietBi += tb.getTenThietBi() + ", ";
			}
			// add to database
			thietBiServices.update(lstThietBiUpdate);
			nhanVienRefThietBiService.updateAll(lstNhanVienTB);

			// ------------------------------------------------------------------
			// add notification
			Notifications notification = new Notifications();
			notification.setCreateDate(new Date());
			DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
			notification.setCreateTime(dateFormat.format(new Date()));

			// get nhan vien
			NhanVien nhanVien = nhanVienService.findById(data.getMaNhanVien());
			// get user request
			Users uRes = new Users();
			try {
				uRes = userService.findByUserName(principal.getName());
			} catch (ResponseStatusException e) {
				uRes.setFullName("N/A");
			}
			notification.setCreateUser(uRes.getFullName());
			notification.setContents("Bàn giao " + count + " thiết bị cho " + nhanVien.getTenNhanVien() + ", gồm "
					+ dsTenThietBi + " ...");
			notification.setNotificationType("NOTIFI_BANGIAO");
			notification.setCode(String.valueOf(phieuRes.getMaBanGiao()));
			notificationsService.save(notification);
			// end add notification

			return phieuRes;
		} catch (Exception e) {
			return null;
		}
	}

	@GetMapping("get-info-thietbi-td/{srtMa}")
	public ThietBiChiTiet getChiTietThietBi(@PathVariable String srtMa) {
		ThietBiChiTiet ct = new ThietBiChiTiet();
		Long maThietBi = null;
		try {
			maThietBi = Long.parseLong(srtMa);
		} catch (Exception e) {
			maThietBi = Long.parseLong(srtMa.substring(4));
		}
		try {
			// get info thietbi
			ThietBi tb = thietBiServices.findById(maThietBi);
			String tenThietBi = thietBiServices.getTenThietBi(maThietBi);
			String tinhTrang = tinhTrangService.getTenTinhTrangByIDThietBi(tb.getMaThietBi());
			//
			// add to object
			ct.setBaoHanh(tb.getBaoHanh());
			ct.setGiaTri(tb.getGiaTri());
			ct.setKhauHao(tb.getKhauHao());
			ct.setMaLoai(tb.getMaLoai());
			ct.setMaTB(String.valueOf(tb.getMaThietBi()));
			ct.setNgayNhap(tb.getNgayNhap());
			ct.setTenThietBi(tenThietBi);
			ct.setTrangThai(tinhTrang);
			return ct;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID_NOT_EXISTS");
		}
	}

	@GetMapping("theo-doi-thietbi/{srtMa}")
	public List<NodeInTimeLine> getAllNodeForThietBi(@PathVariable String srtMa) {
		Long maThietBi = null;
		try {
			maThietBi = Long.parseLong(srtMa);
		} catch (Exception e) {
			maThietBi = Long.parseLong(srtMa.substring(4));
		}
		//
		try {
			ThietBi thietBi = thietBiServices.findById(maThietBi);
			List<NhanVienRefThietBi> lstNhanVienThietBi = nhanVienRefThietBiService.getListNhanVienThietBi(maThietBi);
			List<TinhTrangRefThietBi> lstTinhTrangThietBi = tinhTrangRefThietBiService
					.getListTinhTrangThietBi(maThietBi);
			int id = 1;
			List<NodeInTimeLine> lstNode = new ArrayList<NodeInTimeLine>();

			// add node dau tien - node nhap kho
			NodeInTimeLine nodeDauTien = new NodeInTimeLine();
			nodeDauTien.setId(String.valueOf(-1));
			nodeDauTien.setMaInNode("-1");
			nodeDauTien.setType("kho");
			nodeDauTien.setTuNgay(thietBi.getNgayNhap());
			nodeDauTien.setTenDonVi("Kho");
			nodeDauTien.setTimestame("1");
			nodeDauTien.setTenInNode("Thiết bị được nhập vào kho");
			lstNode.add(nodeDauTien);

			// Lặp qua danh sách NhanVienThietBi
			for (NhanVienRefThietBi nhanVienRefThietBi : lstNhanVienThietBi) {
//				ThietBi tenThietBi = thietBiServices.findById(maThietBi);
				if (nhanVienRefThietBi.getId().getMaNhanVien().equals("RECORE_KHO")) {
					// tạo 1 node mới trên timeLine
					NodeInTimeLine node = new NodeInTimeLine();
					node.setId(String.valueOf(id));
					node.setType("kho");
					node.setMaInNode("RECORE_KHO");
					node.setTuNgay(nhanVienRefThietBi.getTuNgay());
					node.setDenNgay(nhanVienRefThietBi.getDenNgay());
					node.setTenDonVi("Kho");
					node.setMaPhieu(nhanVienRefThietBi.getMaBanGiao());
					node.setMaInNode("Kho");
					node.setTimestame(nhanVienRefThietBi.getTimestame());
					String nodeTitle = "Thiết bị đã được thu hồi về kho";
					node.setTenInNode(nodeTitle);

					// add to colection
					lstNode.add(node);
				} else {
					NhanVien nhanVien = nhanVienService.findById(nhanVienRefThietBi.getId().getMaNhanVien());
					PhongBan phongBan = phongBanService
							.getPhongBanByNhanVienID(nhanVienRefThietBi.getId().getMaNhanVien());
					// tạo 1 node mới trên timeLine
					NodeInTimeLine node = new NodeInTimeLine();
					node.setId(String.valueOf(id));
					node.setType("luan_chuyen");
					node.setMaInNode(phongBan.getMaPhongBan());
					node.setTuNgay(nhanVienRefThietBi.getTuNgay());
					node.setDenNgay(nhanVienRefThietBi.getDenNgay());
					node.setTenDonVi(phongBan.getTenPhongBan());
					node.setMaPhieu(nhanVienRefThietBi.getMaBanGiao());
					node.setMaInNode(nhanVien.getMaNhanVien());
					node.setTimestame(nhanVienRefThietBi.getTimestame());

					if (nhanVienRefThietBi.isKieuBanGiao() == true) {
						// Ban giao cho ca nhan
						String nodeTitle = "Chuyển đến cho nhân viên " + nhanVien.getTenNhanVien() + " - ["
								+ phongBan.getMaPhongBan() + "]" + " " + phongBan.getTenPhongBan();
						node.setTenInNode(nodeTitle);
					} else {
						// Ban giao cho don vi
						String nodeTitle = "Chuyển đến cho phòng ban " + "[" + phongBan.getMaPhongBan() + "]" + " "
								+ phongBan.getTenPhongBan() + " - " + nhanVien.getTenNhanVien();
						node.setTenInNode(nodeTitle);
					}

					// add to colection
					lstNode.add(node);
				}

				id++;
			}

			// Lặp qua danh sách TinhTrangThietBi
			for (TinhTrangRefThietBi tinhTrangRefThietBi : lstTinhTrangThietBi) {
//				ThietBi tenThietBi = thietBiServices.findById(maThietBi);
				TinhTrang tinhTrang = tinhTrangService.findById(tinhTrangRefThietBi.getId().getMaTinhTrang());
				PhongBan phongBan = phongBanService.getPhongBanByThietBiID(tinhTrangRefThietBi.getId().getMaThietBi());
				if(phongBan == null) {
					phongBan = new PhongBan("Kho");
				}
				
				PhieuBaoTri phieuBaoTri = phieuBaoTriService.findByID(tinhTrangRefThietBi.getId().getMaPhieuBaoTri());

				// tạo 1 node mới trên timeLine
				NodeInTimeLine node = new NodeInTimeLine();
				node.setId(String.valueOf(id));
				node.setType("tinh_trang");
				node.setMaInNode(phongBan.getMaPhongBan());
				node.setTuNgay(tinhTrangRefThietBi.getTuNgay());
				node.setDenNgay(tinhTrangRefThietBi.getDenNgay());
				node.setTenDonVi(phongBan.getTenPhongBan());
				node.setMaPhieu(tinhTrangRefThietBi.getId().getMaPhieuBaoTri());
				node.setMaInNode(tinhTrang.getMaTinhTrang());
				node.setTimestame(tinhTrangRefThietBi.getTimestame());
				//
				String tenTinhTrangPhieuBaoTri = phieuBaoTri.getTinhTrangPhieu().equals("cho_sua_chua")
						? "Đang chờ sửa chữa"
						: phieuBaoTri.getTinhTrangPhieu().equals("sua_chua") ? "Đang sửa chữa" : "Đã sửa chữa";
				String nodeTitle = "Tình trạng " + "[" + tinhTrang.getMaTinhTrang() + "]" + " "
						+ tinhTrang.getTenTinhTrang() + " [" + tenTinhTrangPhieuBaoTri + "]";
				node.setTenInNode(nodeTitle);

				// add to colection
				lstNode.add(node);
				id++;
			}
			// sawsp xếp lại mảng
			Collections.sort(lstNode, new TimeLineConporator());

			// set đến ngày cho node nhập kho
			if (lstNode.size() >= 2) {
				Date tuNgay = lstNode.get(lstNode.size() - 2).getTuNgay();
				lstNode.get(lstNode.size() - 1).setDenNgay(tuNgay);
			}
			return lstNode;
		} catch (Exception e) {
			// parse dâta eror
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID_NOT_EXISTS");
		}
	}

	// fuction checkc get phieu ban giao

	// getall phieu ban giao
	@GetMapping("get-all-phieu-bangiao")
	public List<PhieuBanGiaoChiTiet> getAllPhieuBanGiao() {
		try {
			List<PhieuBanGiao> phieus = phieuBanGiaoService.findAll();
			List<PhieuBanGiaoChiTiet> phieuChiTiets = new ArrayList<>();
			for (PhieuBanGiao phieu : phieus) {
				NhanVien nhanVien = null;

				// get thông tin nhân viên trong dâtbase
				try {
					nhanVien = nhanVienService.findById(phieu.getNguoiBanGiao());
				} catch (Exception e) {
					nhanVien = new NhanVien();
				}

				// thêm 1 phiếu bàn giao mới
				PhieuBanGiaoChiTiet phieuChiTiet = new PhieuBanGiaoChiTiet();
				phieuChiTiet.setMaBanGiao(String.valueOf(phieu.getMaBanGiao()));
				phieuChiTiet.setNgayBanGiao(phieu.getNgayBanGiao().toString());
				phieuChiTiet.setNoiDungBanGiao(phieu.getNoiDungBanGiao());
				phieuChiTiet.setNguoiBanGiao(phieu.getNguoiBanGiao());
				phieuChiTiet.setTenNguoiBanGiao(
						nhanVien.getTenNhanVien() != null ? nhanVien.getTenNhanVien() : "Nhân viên không còn tồn tại");

				// add phiếu vào list
				phieuChiTiets.add(phieuChiTiet);
			}

			Collections.sort(phieuChiTiets, new PhieuLuanChuyenComparator());

			return phieuChiTiets;
		} catch (Exception e) {
			return new ArrayList<PhieuBanGiaoChiTiet>();
		}
	}

	@GetMapping("get-chitiet-bangiao/{maBanGiao}")
	public List<ThietBiChiTiet> getAllChiTietPhieuBanGiao(@PathVariable int maBanGiao) {
		try {
			List<ThietBi> lstThietBi = thietBiServices.getAllThietBiByPhieuBanGiao(maBanGiao);
			List<ThietBiChiTiet> lstThietBiChiTiet = new ArrayList<>();
			// lawjp qua danh sach thiet bi
			for (ThietBi thietBi : lstThietBi) {
				LoaiTB loaiTB = loaiThietBiService.getLoaiThietBiFromThietBiCon(thietBi.getMaLoai());
				LoaiTB loaiTBCon = loaiThietBiService.findByID(thietBi.getMaLoai());
				// get NhaCungCap tuwf MaLoaiCon cua mojt thiet bi
				NhaCungCap ncc = nhaCungCapService.getNhaCungCapByMaLoaiCon(thietBi.getMaLoai());

				// tajo 1 thiet bi chi tiet
				ThietBiChiTiet tbs = new ThietBiChiTiet(
						"" + ncc.getMaNCC() + loaiTB.getMaLoai() + thietBi.getMaThietBi(), loaiTBCon.getTenLoai(),
						thietBi.getBaoHanh(), thietBi.getGiaTri(), thietBi.getKhauHao(), thietBi.getMaLoai(),
						thietBi.getNgayNhap(), tinhTrangService.getTenTinhTrangByIDThietBi(thietBi.getMaThietBi()));

				// add thietBi chi tiet vua tao vao list
				lstThietBiChiTiet.add(tbs);
			}
			return lstThietBiChiTiet;
		} catch (Exception e) {
			return null;
		}
	}

	@PostMapping("thu-hoi-thietbi")
	@Transactional
	public PhieuBanGiao thuHoiThietBi(@RequestBody List<String> lstMaThietBi, Principal principal) {
		try {
			List<ThietBi> lstThietBiUpdate = new ArrayList<ThietBi>();
			// create list contain recore update
			List<NhanVienRefThietBi> lstUpdate = new ArrayList<NhanVienRefThietBi>();
			List<NhanVienRefThietBi> lstNew = new ArrayList<NhanVienRefThietBi>();

			Long maTB = null;
			// dòng tạm dùng sác định thiết bị đã chuyển lại về kho
			if (!nhanVienService.existsById("RECORE_KHO")) {
				NhanVien nhanVienTmp = new NhanVien("RECORE_KHO");
				nhanVienTmp.setTenNhanVien("Kho");
				nhanVienService.save(nhanVienTmp);
			}
			NhanVien nhanVien = nhanVienService.findById("RECORE_KHO");

			// Create new PhieuBanGiao
			PhieuBanGiao phieuBanGiao = new PhieuBanGiao();
			phieuBanGiao.setNgayBanGiao(new Date());
			phieuBanGiao.setNguoiBanGiao(nhanVien.getMaNhanVien());
			phieuBanGiao.setNoiDungBanGiao("Thu hoi thiet bi ve lai kho");
			PhieuBanGiao phieuRes = phieuBanGiaoService.save(phieuBanGiao);
			//
			int count = 0; // dung dem so luong thiet bi
			String dsTenThietBi = ""; // dung get ten thietbi de thong bao

			for (String maThietBiStr : lstMaThietBi) {
				try {
					maTB = Long.parseLong(maThietBiStr);
				} catch (Exception e) {
					maTB = Long.parseLong(maThietBiStr.substring(4));
				}

				// kiem tra thiet bi da ton tai hay chưa
				NhanVien nhanVienCheck = nhanVienService.getNhanVienByMaThietBi(maTB);
				if (nhanVienCheck.getMaNhanVien().equals(nhanVien.getMaNhanVien())) {
					throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NHAN_VIEN_DA_SO_HUU_THIETBI");
				}

				// create new recore
				NhanVienRefThietBiPK key = new NhanVienRefThietBiPK(nhanVien.getMaNhanVien(), maTB,
						phieuRes.getMaBanGiao());
				NhanVienRefThietBi object = new NhanVienRefThietBi(key, new Date(), true, phieuRes);
				object.setTimestame(this.getTimestame());
				lstNew.add(object);

				// update old recore
				NhanVienRefThietBi recoreOld = nhanVienRefThietBiService.getAllMathietbi(maTB);
				if (recoreOld != null) {
					recoreOld.setDenNgay(new Date());
					lstUpdate.add(recoreOld);
				} else {
					throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "LUAN_CHUYEN_CONFLICT_DENNGAY");
				}

				// --------------------------------
				ThietBi thietBi = thietBiServices.findById(maTB);
				thietBi.setTinhTrangKho(true);
				lstThietBiUpdate.add(thietBi);

				// -------------------------
				// count
				count++;
				dsTenThietBi += thietBiServices.getTenThietBi(maTB) + ", ";

			}
			nhanVienRefThietBiService.updateAll(lstUpdate);
			nhanVienRefThietBiService.updateAll(lstNew);
			thietBiServices.saveAll(lstThietBiUpdate);

			// ------------------------------------------------------------------
			// add notification
			Notifications notification = new Notifications();
			notification.setCreateDate(new Date());
			DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
			notification.setCreateTime(dateFormat.format(new Date()));

			// get user request
			Users uRes = new Users();
			try {
				uRes = userService.findByUserName(principal.getName());
			} catch (ResponseStatusException e) {
				uRes.setFullName("N/A");
			}
			notification.setCreateUser(uRes.getFullName());
			notification.setContents("Thu hồi " + count + " thiết bị về kho, gồm " + dsTenThietBi + " ...");
			notification.setNotificationType("NOTIFI_LUANCHUYEN");
			notification.setCode(String.valueOf(phieuRes.getMaBanGiao()));
			notificationsService.save(notification);
			// end add notification
			return phieuRes;
		} catch (Exception e) {
			return null;
		}
	}
}
