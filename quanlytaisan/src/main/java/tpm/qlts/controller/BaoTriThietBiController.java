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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import tpm.qlts.comporator.PhieuBaoTriComporator;
import tpm.qlts.custommodels.BaoTriData;
import tpm.qlts.custommodels.ChiTietPhieuBaoTri;
import tpm.qlts.custommodels.ChiTietThietBi;
import tpm.qlts.entitys.NhaCungCap;
import tpm.qlts.entitys.NhanVien;
import tpm.qlts.entitys.Notifications;
import tpm.qlts.entitys.PhieuBaoTri;
import tpm.qlts.entitys.ThietBi;
import tpm.qlts.entitys.TinhTrang;
import tpm.qlts.entitys.TinhTrangRefThietBi;
import tpm.qlts.entitys.TinhTrangRefThietBiPK;
import tpm.qlts.entitys.Users;
import tpm.qlts.services.NhaCungCapService;
import tpm.qlts.services.NhanVienService;
import tpm.qlts.services.NotificationsService;
import tpm.qlts.services.PhieuBaoTriService;
import tpm.qlts.services.ThietBiServices;
import tpm.qlts.services.TinhTrangRefThietBiService;
import tpm.qlts.services.TinhTrangServiceByNam;
import tpm.qlts.services.UserRevice;

@Controller
@RestController
@RequestMapping("baotri")
public class BaoTriThietBiController {

	@Autowired
	private TinhTrangServiceByNam tinhTrangService;

	@Autowired
	private ThietBiServices thietBiService;

	@Autowired
	private PhieuBaoTriService phieuBaoTriService;

	@Autowired
	private TinhTrangRefThietBiService tinhTrangRefThietBiService;

	@Autowired
	private NhanVienService nhanVienService;

	@Autowired
	private NotificationsService notificationsService;

	@Autowired
	private NhaCungCapService nhaCungCapService;

	@Autowired
	private UserRevice userService;

	@GetMapping("get-all-tinhtrang")
	public List<TinhTrang> getALlTinhTrang() {
		return tinhTrangService.findAll();
	}

	@GetMapping("lay-tt-thiet-bi/{key}")
	public ChiTietThietBi LayThongTinThietBi(@PathVariable long key) {
		if (thietBiService.checkExisted(key) == true) {
			ThietBi tb = thietBiService.findById(key);

			ChiTietThietBi ctTB = new ChiTietThietBi(tb.getLoaiTb().getTenLoai(), tb.getMaThietBi(), tb.getBaoHanh(),
					tb.getGiaTri(), tb.getKhauHao(), tb.getNgayNhap(),
					tinhTrangService.getMaTinhTrangByIDThietBi(tb.getMaThietBi()),
					tinhTrangService.getTenTinhTrangByIDThietBi(tb.getMaThietBi()));
			return ctTB;
		} else {
			return null;
		}
	}

	@PostMapping("lap-danh-sach-baotri")
	@Transactional
	public PhieuBaoTri lapDanhSachThietBiBaoTri(@RequestBody BaoTriData data, Principal principal) {
		PhieuBaoTri phieuBaoTri = phieuBaoTriService.save(new PhieuBaoTri("cho_sua_chua"));
		List<TinhTrangRefThietBi> newLstTTTBs = new ArrayList<TinhTrangRefThietBi>();
		//
		int count = 0; // dung dem so luong thiet bi
		String dsTenThietBi = ""; // dung get ten thietbi de thong bao

		if (data.getLstThietBi().size() > 0) {
			for (ChiTietThietBi tb : data.getLstThietBi()) {
				if (tinhTrangRefThietBiService.checkTinhTrangTB(tb.getMaThietBi(), "TT02")) {
					// new object
					TinhTrangRefThietBi object = new TinhTrangRefThietBi(
							new TinhTrangRefThietBiPK("TT02", tb.getMaThietBi(), phieuBaoTri.getMaPhieuBaoTri()), null,
							new Date());
					object.setTimestame(this.getTimestame());
					// add to colection
					newLstTTTBs.add(object);
				} else {
					throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NOT_CHANGE_TT");
				}

				// count notification
				count++;
				ThietBi thietBiFull = thietBiService.findById(tb.getMaThietBi());
				NhaCungCap nccNo = nhaCungCapService.getNhaCungCapByMaLoaiCon(thietBiFull.getMaLoai());
				String maFull = nccNo.getMaNCC() + thietBiFull.getMaLoai() + thietBiFull.getMaThietBi();
				dsTenThietBi += tb.getTenThietBi() + "[" + maFull + "], ";
			}
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NON_ITEM_IN_LIST");
		}

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
		notification.setContents("Lập danh sách sửa chữa cho " + count + " thiết bị, gồm " + dsTenThietBi + " ...");
		notification.setNotificationType("NOTIFI_BAOTRI");
		notification.setCode(String.valueOf(phieuBaoTri.getMaPhieuBaoTri()));
		notificationsService.save(notification);
		// end add notification
		tinhTrangRefThietBiService.saveAll(newLstTTTBs);
		return phieuBaoTri;
	}

	// on Lst Bao Tri Thiet Bi
	@GetMapping("get-all-phieu-baotri")
	public Iterable<PhieuBaoTri> getAllPhieuBaoTriThietBi() {
		List<PhieuBaoTri> lstPhieu = (List<PhieuBaoTri>) phieuBaoTriService.findAll();
		Collections.sort(lstPhieu, new PhieuBaoTriComporator());
		return lstPhieu;
	}

	@GetMapping("get-ct-phieu-baotri/{maPhieu}")
	public List<ChiTietPhieuBaoTri> getChiTietPhieuBaoTri(@PathVariable int maPhieu) {
		List<TinhTrangRefThietBi> lstTTTB = tinhTrangRefThietBiService.getByMaPhieuBaoTri(maPhieu);

		List<ChiTietPhieuBaoTri> lstChiTietPhieu = new ArrayList<ChiTietPhieuBaoTri>();

		for (TinhTrangRefThietBi ttrefTB : lstTTTB) {
			lstChiTietPhieu.add(
					new ChiTietPhieuBaoTri(ttrefTB.getDenNgay(), ttrefTB.getTuNgay(), ttrefTB.getId().getMaTinhTrang(),
							tinhTrangService.findById(ttrefTB.getId().getMaTinhTrang()).getTenTinhTrang(),
							ttrefTB.getId().getMaThietBi(),
							thietBiService.findById(ttrefTB.getId().getMaThietBi()).getLoaiTb().getTenLoai(),
							ttrefTB.getId().getMaPhieuBaoTri()));
		}

		return lstChiTietPhieu;
	}

	@PutMapping("batdau-baotri/{maPhieu}")
	public List<ChiTietPhieuBaoTri> updateDangBaoTri(@PathVariable int maPhieu, Principal principal) {
		List<TinhTrangRefThietBi> updateLstTTTBs = tinhTrangRefThietBiService.getByMaPhieuBaoTri(maPhieu);
		List<TinhTrangRefThietBi> deleteLstTTTBs = updateLstTTTBs;

		PhieuBaoTri phieu = phieuBaoTriService.findByID(maPhieu);
		phieu.setTinhTrangPhieu("sua_chua");
		phieu.setNgayBaoTri(new Date());

		for (int i = 0; i < updateLstTTTBs.size(); i++) {
			updateLstTTTBs.get(i).setId(new TinhTrangRefThietBiPK("TT03", updateLstTTTBs.get(i).getId().getMaThietBi(),
					updateLstTTTBs.get(i).getId().getMaPhieuBaoTri()));
		}
		tinhTrangRefThietBiService.deleteAll(deleteLstTTTBs);
		phieuBaoTriService.save(phieu);

		List<TinhTrangRefThietBi> lstTTTBs = tinhTrangRefThietBiService.saveAll(updateLstTTTBs);

		List<ChiTietPhieuBaoTri> lstChiTietPhieu = new ArrayList<ChiTietPhieuBaoTri>();

		for (TinhTrangRefThietBi ttrefTB : lstTTTBs) {
			lstChiTietPhieu.add(
					new ChiTietPhieuBaoTri(ttrefTB.getDenNgay(), ttrefTB.getTuNgay(), ttrefTB.getId().getMaTinhTrang(),
							tinhTrangService.findById(ttrefTB.getId().getMaTinhTrang()).getTenTinhTrang(),
							ttrefTB.getId().getMaThietBi(),
							thietBiService.findById(ttrefTB.getId().getMaThietBi()).getLoaiTb().getTenLoai(),
							ttrefTB.getId().getMaPhieuBaoTri()));
		}

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
		notification.setContents(
				"Chuyển trạng thái phiếu sửa chữa [" + phieu.getMaPhieuBaoTri() + "] sang trạng thái sửa chữa");
		notification.setNotificationType("NOTIFI_BAOTRI");
		notification.setCode(String.valueOf(phieu.getMaPhieuBaoTri()));
		notificationsService.save(notification);
		// end add notification

		return lstChiTietPhieu;
	}

	@PutMapping("hoanthanh-baotri/{maPhieu}")
	public List<ChiTietPhieuBaoTri> updateHoanThanhBaoTri(@PathVariable int maPhieu, @RequestBody BaoTriData data,
			Principal principal) {
		List<TinhTrangRefThietBi> updateLstTTTBs = tinhTrangRefThietBiService.getByMaPhieuBaoTri(maPhieu);
		List<TinhTrangRefThietBi> deleteLstTTTBs = updateLstTTTBs;

		// Set thông tin phiếu
		PhieuBaoTri phieu = phieuBaoTriService.findByID(maPhieu);
		phieu.setTinhTrangPhieu("hoang_thanh");
		phieu.setDiaChiBaoTri(data.getDiaChiBaoTri());
		phieu.setMaNhanVienChiuTrachNhiem(data.getMaNhanVienChiuTrachNhiem());
		phieu.setNoiBaoTri(data.getNoiBaoTri());
		phieu.setPhiBaoTri(data.getPhiBaoTri());

		// Tạo danh sach cập nhật TinhTrangRefThietBi
		for (int i = 0; i < updateLstTTTBs.size(); i++) {
			updateLstTTTBs.get(i).setId(new TinhTrangRefThietBiPK("TT01", updateLstTTTBs.get(i).getId().getMaThietBi(),
					updateLstTTTBs.get(i).getId().getMaPhieuBaoTri()));
			updateLstTTTBs.get(i).setDenNgay(new Date());
		}
		tinhTrangRefThietBiService.deleteAll(deleteLstTTTBs);
		phieuBaoTriService.save(phieu);
		List<TinhTrangRefThietBi> lstTTTBs = tinhTrangRefThietBiService.saveAll(updateLstTTTBs);

		// Custom dữ liệu trả về
		List<ChiTietPhieuBaoTri> lstChiTietPhieu = new ArrayList<ChiTietPhieuBaoTri>();

		for (TinhTrangRefThietBi ttrefTB : lstTTTBs) {
			lstChiTietPhieu.add(
					new ChiTietPhieuBaoTri(ttrefTB.getDenNgay(), ttrefTB.getTuNgay(), ttrefTB.getId().getMaTinhTrang(),
							tinhTrangService.findById(ttrefTB.getId().getMaTinhTrang()).getTenTinhTrang(),
							ttrefTB.getId().getMaThietBi(),
							thietBiService.findById(ttrefTB.getId().getMaThietBi()).getLoaiTb().getTenLoai(),
							ttrefTB.getId().getMaPhieuBaoTri()));
		}

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
		notification.setContents("Chuyển trạng thái phiếu sửa chữa [" + phieu.getMaPhieuBaoTri()
				+ "] sang trạng thái hoàn thành sửa chữa");
		notification.setNotificationType("NOTIFI_BAOTRI");
		notification.setCode(String.valueOf(phieu.getMaPhieuBaoTri()));
		notificationsService.save(notification);
		// end add notification

		return lstChiTietPhieu;
	}

	@GetMapping("get-all-nhanvien")
	public List<NhanVien> getAllNhanVien() {
		return nhanVienService.findAll();
	}

	public String getTimestame() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		return String.valueOf(timestamp.getTime());
	}

}
