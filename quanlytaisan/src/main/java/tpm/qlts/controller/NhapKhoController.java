package tpm.qlts.controller;

import java.security.Principal;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.aop.AopInvocationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import tpm.qlts.custommodels.DataNhapKho;
import tpm.qlts.custommodels.ThietBiNhap;
import tpm.qlts.entitys.BienNhanThietBi;
import tpm.qlts.entitys.ChiTiet;
import tpm.qlts.entitys.DonViTinh;
import tpm.qlts.entitys.GeneralChiMuc;
import tpm.qlts.entitys.LoaiTB;
import tpm.qlts.entitys.NhaCungCap;
import tpm.qlts.entitys.Notifications;
import tpm.qlts.entitys.ThietBi;
import tpm.qlts.entitys.Users;
import tpm.qlts.services.BienNhanThietBiServices;
import tpm.qlts.services.ChiMucLoaiService;
import tpm.qlts.services.ChiTietServices;
import tpm.qlts.services.DonViTinhService;
import tpm.qlts.services.LoaiTBService;
import tpm.qlts.services.NhaCungCapService;
import tpm.qlts.services.NotificationsService;
import tpm.qlts.services.ThietBiServices;
import tpm.qlts.services.UserRevice;

@Controller
@RestController
@RequestMapping("nhap-kho")
public class NhapKhoController {
	@Autowired
	NhaCungCapService nhaCungCapService;

	@Autowired
	DonViTinhService donViTinhService;

	@Autowired
	LoaiTBService loaiTBService;

	@Autowired
	ThietBiServices thietBiServices;

	@Autowired
	BienNhanThietBiServices bienNhanThietBiService;

	@Autowired
	ChiTietServices chiTietService;

	@Autowired
	ChiMucLoaiService chiMucLoaiService;

	@Autowired
	private UserRevice userService;

	@Autowired
	private NotificationsService notificationsService;

	// get-info
	@GetMapping("get-all-ncc")
	public List<NhaCungCap> getAllNhaCungCap() {
		return nhaCungCapService.findAll();
	}

	@GetMapping("get-all-dvt")
	public List<DonViTinh> getAllDonViTinh() {
		return donViTinhService.findAll();
	}

	@GetMapping("get-loaitb-sub")
	public List<LoaiTB> getLoaiTBSub() {
		return loaiTBService.getLoaiTBSub();
	}

	@GetMapping("get-loaitb-cha")
	public List<LoaiTB> getLoaiTBCha() {
		return loaiTBService.getLoaiTBCha();
	}

	@GetMapping("get-loaitb-by-ncc/{maNCC}")
	public List<LoaiTB> getAllLoaiTBByNhaCungCap(@PathVariable String maNCC) {
		return loaiTBService.getAllLoaiTBByNhaCungCap(maNCC);
	}

	@GetMapping("get-loaitb-by-loaicha/{maLoaiCha}")
	public List<LoaiTB> getLoaiConByLoaiCha(@PathVariable String maLoaiCha) {
		return loaiTBService.getLoaiConByLoaiCha(maLoaiCha);
	}

	@GetMapping("get-autoid/{soluong}")
	public long[] getMaAutoByList(@PathVariable int soluong) {
		long maxID;
		try {
			maxID = thietBiServices.getMaxIDThietBi();
		} catch (AopInvocationException e) {
			maxID = 1000;
		}
		long[] lstIDRes = new long[soluong];

		for (int i = 0; i < soluong; i++) {
			lstIDRes[i] = maxID;
			maxID++;
		}
		return lstIDRes;
	}

	@GetMapping("get-max-id-thiet-bi")
	public long getMaxIDThietBi() {
		return thietBiServices.getMaxIDThietBi();
	}

	@PostMapping("nhap-kho-hang-loat")
	@Transactional
	public BienNhanThietBi nhapKho(@RequestBody DataNhapKho data, Principal principal) {
		List<ThietBi> lstThietBi = new ArrayList<ThietBi>();
		BienNhanThietBi bienNhan = new BienNhanThietBi();
		List<ChiTiet> lstChiTietBienNhan = new ArrayList<ChiTiet>();
		NhaCungCap ncc = nhaCungCapService.findById(data.getMaNhaCungCap());
		//
		int count = 0; // dung dem so luong thiet bi
		String dsTenThietBi = ""; // dung get ten thietbi de thong bao

		// Don bien nhan
		String maBienNhan = getMaBienNhan();
		bienNhan.setMaBienNhan(maBienNhan);
		bienNhan.setNgayBienNhan(new Date());
		bienNhan.setMaNCC(ncc.getTenNCC());
		bienNhan.setInputtype(data.getKieuNhap());
		bienNhan.setNgayBienNhan(new Date());
		bienNhan.setDiaDiemGiao(data.getDiaDiemGiao());

		// Chi tiet bien nhan
		for (ThietBiNhap thietBi : data.getLstThietBi()) {
			System.out.println("masdjkgbaskdsd" + thietBi.getMaDonViTinh());
			ChiTiet chiTiet = new ChiTiet();
			chiTiet.setTenThietBi(thietBi.getTenThietBi());
			chiTiet.setDonViTinh(thietBi.getMaDonViTinh());
			chiTiet.setSoLuong(thietBi.getSoLuong());
			chiTiet.setBienNhanThietBi(bienNhan);
			chiTiet.setGiaTri(thietBi.getDonGia());

			double khauHao = Double.parseDouble(String.valueOf(thietBi.getKhauHao()));
			DonViTinh dvt = donViTinhService.findById(thietBi.getMaDonViTinh());

			//
			dsTenThietBi += chiTiet.getTenThietBi() + ", ";
			// Add thiet bi
			LoaiTB loaiCoSan = loaiTBService.findByID(thietBi.getMaNhomThietBi());
			for (Long maThietBi : thietBi.getLstMaThietBi()) {
				ThietBi tb = new ThietBi(maThietBi, thietBi.getBaoHanh(), thietBi.getDonGia(), khauHao, new Date(),
						bienNhan, dvt, loaiCoSan);
				lstThietBi.add(tb);
				//
				count++;
			}

			lstChiTietBienNhan.add(chiTiet);
		}
		BienNhanThietBi resBienNhan = bienNhanThietBiService.update(bienNhan);
		chiTietService.updateAll(lstChiTietBienNhan);
		thietBiServices.update(lstThietBi);

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
		notification.setContents("Nhập " + count + " thiết bị vào kho, gồm " + dsTenThietBi + " ...");
		notification.setNotificationType("NOTIFI_NHAPKHO");
		notification.setCode(String.valueOf(resBienNhan.getMaBienNhan()));
		notificationsService.save(notification);
		// end add notification

		return resBienNhan;
	}

	@GetMapping("get-chi-muc-test")
	private Iterable<GeneralChiMuc> generalMaLoaiCon() {
		return chiMucLoaiService.findAll();
	}

	public String getMaBienNhan() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		return "BN" + timestamp.getTime();
	}
}
