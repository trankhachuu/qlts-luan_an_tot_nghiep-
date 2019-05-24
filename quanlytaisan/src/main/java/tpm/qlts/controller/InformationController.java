package tpm.qlts.controller;

import java.security.Principal;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import tpm.qlts.custommodels.ChiTietYeuCauUpdate;
import tpm.qlts.custommodels.DSTBByNhanVien;
import tpm.qlts.custommodels.DanhSachTB;
import tpm.qlts.custommodels.DataUpdateNhanVienThietBi;
import tpm.qlts.custommodels.DisplayThietBi;
import tpm.qlts.custommodels.LuanChuyenOptions;
import tpm.qlts.custommodels.NhanVienUpdate;
import tpm.qlts.custommodels.PhieuYeuCauThietBiUpdate;
import tpm.qlts.custommodels.options;
import tpm.qlts.entitys.ChiTietYeuCau;
import tpm.qlts.entitys.ChucVu;
import tpm.qlts.entitys.DonViTinh;
import tpm.qlts.entitys.LoaiTB;
import tpm.qlts.entitys.NhaCungCap;
import tpm.qlts.entitys.NhanVien;
import tpm.qlts.entitys.NhanVienRefThietBi;
import tpm.qlts.entitys.NhanVienRefThietBiPK;
import tpm.qlts.entitys.Notifications;
import tpm.qlts.entitys.PhieuBanGiao;
import tpm.qlts.entitys.PhieuYeuCauThietBi;
import tpm.qlts.entitys.PhongBan;
import tpm.qlts.entitys.ThietBi;
import tpm.qlts.entitys.TinhTrang;
import tpm.qlts.entitys.TinhTrangRefThietBi;
import tpm.qlts.entitys.Users;
import tpm.qlts.services.ChiTietYeuCauServices;
import tpm.qlts.services.ChucVuService;
import tpm.qlts.services.DonViTinhService;
import tpm.qlts.services.LoaiTBService;
import tpm.qlts.services.NhaCungCapService;
import tpm.qlts.services.NhanVienRefThietBiService;
import tpm.qlts.services.NhanVienService;
import tpm.qlts.services.NotificationsService;
import tpm.qlts.services.PhieuBanGiaoService;
import tpm.qlts.services.PhieuYeuCauThietBiServices;
import tpm.qlts.services.PhongBanService;
import tpm.qlts.services.ThietBiServices;
import tpm.qlts.services.TinhTrangService;
import tpm.qlts.services.UserRevice;

@Controller
@RestController
@RequestMapping("infor")
public class InformationController {
	@Autowired
	private PhongBanService phongBanService;

	@Autowired
	private NhanVienService nhanVienService;

	@Autowired
	private ChucVuService chucVuService;

	@Autowired
	private TinhTrangService tinhTrangService;

	@Autowired
	private DonViTinhService donViTinhService;

	@Autowired
	private ChiTietYeuCauServices chiTietYeuCauServices;

	@Autowired
	private PhieuYeuCauThietBiServices phieuYeuCauThietBiServices;

	@Autowired
	private LoaiTBService loaiTBService;

	@Autowired
	private ThietBiServices thietBiServices;

	@Autowired
	private NhanVienRefThietBiService NhanVienRefThietBiService;

	@Autowired
	private PhieuBanGiaoService phieuBanGiaoService;

	@Autowired
	private NotificationsService notificationsService;

	@Autowired
	private UserRevice userService;

	@Autowired
	private NhaCungCapService nhaCungCapService;

	@SuppressWarnings("unused")
	@GetMapping(value = "listAllPhongBan")
	public List<PhongBan> getPhongBan() {
		return phongBanService.findAll();
	}

	@PostMapping(value = "add-phongban")
	public PhongBan addPhongBan(@RequestBody PhongBan phongBan) {
		PhongBan resPhongBan = phongBanService.update(phongBan);
		return resPhongBan;
	}

	@PutMapping("update-phongban")
	public PhongBan updatePhongBan(@RequestBody PhongBan phongBan) {
		if (phongBanService.existsById(phongBan.getMaPhongBan())) {
			return phongBanService.update(phongBan);
		}
		return null;
	}

	@DeleteMapping(value = "delete-phongban/{id}")
	public void deletePhongBan(@PathVariable String id) {
		phongBanService.deleteById(id);
	}

	@DeleteMapping("delete-listPhongBan")
	public int deleteBylistPhongBan(@RequestBody List<String> lstID) {
		int count = 0;
		for (String id : lstID) {
			if (phongBanService.existsById(id)) {
				phongBanService.deleteById(id);
			}
			count++;
		}
		return count;
	}

	@GetMapping(value = "listAllChucVu")
	public List<ChucVu> getChucVu() {
		List<ChucVu> listChucVu = chucVuService.findAll();
		return listChucVu;
	}

	@PostMapping("add-ChucVu")
	public ChucVu addChucVu(@RequestBody ChucVu chucVu) {
		ChucVu resChucVu = chucVuService.update(chucVu);
		return resChucVu;
	}

	@GetMapping(value = "listAllNhanVien")
	public List<NhanVien> getNhanVien() {
		List<NhanVien> listNhanVien = nhanVienService.findAll();
		return listNhanVien;
	}

	@GetMapping(value = "listAllNhanVienByPhongBan/{maPhongBan}")
	public List<NhanVien> getNhanVienByPhongBan(@PathVariable String maPhongBan) {
		List<NhanVien> listNhanVien = nhanVienService.getNhanVienRefPhongBan(maPhongBan);
		return listNhanVien;
	}

	@PostMapping(value = "add-employee")
	public NhanVienUpdate addEmployee(@RequestBody NhanVien nhanVien) { // vì sao lại có 2 cái trường đầu tiên
//		 vì trong entity nhân viên xét thuộc tính insertable và updatetable xét cho nó là false nên khi vào phải get cái trường đó vào
		nhanVien.setChucVu(new ChucVu(nhanVien.getMaChucVu()));
		nhanVien.setPhongBan(new PhongBan(nhanVien.getMaPhongBan()));
		NhanVien resNhanVien = nhanVienService.save(nhanVien);
		String tenChucVu = resNhanVien.getChucVu().getTenChucVu();
		String tenPhongBan = resNhanVien.getPhongBan().getTenPhongBan();

		return new NhanVienUpdate(resNhanVien.getMaNhanVien(), resNhanVien.getTenNhanVien(), resNhanVien.getNgaySinh(),
				resNhanVien.getQueQuan(), tenChucVu, tenPhongBan);
	}

	@RequestMapping(value = "update-employee", method = RequestMethod.PUT)
	public NhanVienUpdate updateNhanVien(@RequestBody NhanVien nhanVien) {
		nhanVien.setChucVu(new ChucVu(nhanVien.getMaChucVu()));
		nhanVien.setPhongBan(new PhongBan(nhanVien.getMaPhongBan()));
		if (nhanVienService.existsById(nhanVien.getMaNhanVien())) {
			NhanVien resNhanVien = nhanVienService.save(nhanVien);
			String tenChucVu = resNhanVien.getChucVu().getTenChucVu();
			String tenPhongBan = resNhanVien.getPhongBan().getTenPhongBan();
			return new NhanVienUpdate(resNhanVien.getMaNhanVien(), resNhanVien.getTenNhanVien(),
					resNhanVien.getNgaySinh(), resNhanVien.getQueQuan(), tenChucVu, tenPhongBan);
		}
		return null;
	}

	@DeleteMapping(value = "delete-employee/{id}")
	public void deleteNhanVien(@PathVariable String id) {
		nhanVienService.deleteById(id);
	}

	@DeleteMapping("delete-by-listNhanVien")
	public int deleteByListNhanVien(@RequestBody List<String> lstID) {
		int cout = 0;
		for (String id : lstID) {
			if (nhanVienService.existsById(id)) {
				nhanVienService.deleteById(id);
				cout++;
			}
		}
		return cout;
	}

	@GetMapping(value = "list-employeeId/{id}")
	public NhanVien getNhanVienById(@PathVariable String id) {
		return nhanVienService.findById(id);
	}

	@GetMapping(value = "list-employeeByName/{ten}")
	public List<NhanVien> listNhanVienByName(@PathVariable("ten") String ten) {
		return nhanVienService.findNhanVienByName(ten);
	}

	@GetMapping("list-tinhtrang")
	public List<TinhTrang> getTinhTrang() {
		List<TinhTrang> resTinhTrang = tinhTrangService.findAll();
		return resTinhTrang;
	}

	@PostMapping(value = "add-tinhtrang")
	public TinhTrang addTinhTrang(@RequestBody TinhTrang tinhTrang) {
		TinhTrang resTinhTrang = tinhTrangService.update(tinhTrang);
		return resTinhTrang;
	}

	@PutMapping(value = "update-tinhtrang")
	public TinhTrang updateTinhTrang(@RequestBody TinhTrang tinhTrang) {
		if (tinhTrangService.exitstsById(tinhTrang.getMaTinhTrang())) {
			TinhTrang resTinhTrang = tinhTrangService.update(tinhTrang);
			return resTinhTrang;
		}
		return null;
	}

	@DeleteMapping(value = "delete-tinhtrang/{id}")
	public void deleteTinhTrang(@PathVariable String id) {
		tinhTrangService.deleteById(id);
	}

	@DeleteMapping("delete-by-list")
	public int deleteByList(@RequestBody List<String> lstID) {
		int cout = 0;
		for (String id : lstID) {
			if (tinhTrangService.exitstsById(id)) {
				tinhTrangService.deleteById(id);
				cout++;
			}
		}
		return cout;
	}

//	@GetMapping(value="list-searchNhanVien/{key}")
//	public List<NhanVienUpdate> search(@RequestBody String key){
//		List<NhanVien> nvList = nhanVienService.findByKey(key);
//
//		List<NhanVienUpdate> resList = new ArrayList<>();
//		for(NhanVien nvItem : nvList){
//
//			resList.add(new NhanVienUpdate(nvItem.getTenNhanVien(), nvItem.getChucVu().getTenChucVu(), nvItem.getNgaySinh(), nvItem.getQueQuan(), nvItem.getPhongBan().getTenPhongBan(), key));
//		}
//		return resList;
//
//	}

	@RequestMapping(value = "list-employeeUpdate")
	public List<NhanVienUpdate> getNhanVienUpdate() {
		List<NhanVien> nvList = nhanVienService.findAll();

		List<NhanVienUpdate> reslist = new ArrayList<>();
		for (NhanVien nvItem : nvList) {

			reslist.add(new NhanVienUpdate(nvItem.getMaNhanVien(), nvItem.getTenNhanVien(), nvItem.getNgaySinh(),
					nvItem.getQueQuan(), nvItem.getChucVu().getTenChucVu(), nvItem.getPhongBan().getTenPhongBan()));
		}
		return reslist;
	}

	//////////////////////// ----------Don vi
	//////////////////////// tinh-----------------///////////////////////
	@GetMapping(value = "listAllDonViTinh")
	public List<DonViTinh> listDonViTinh() {
		return donViTinhService.findAll();
	}

	@PostMapping(value = "add-newdonvitinh")
	public DonViTinh addDonViTinh(@RequestBody DonViTinh donViTinh) {
		return donViTinhService.save(donViTinh);
	}

	@PutMapping(value = "update-donviinh")
	public DonViTinh updateDonViTinh(@RequestBody DonViTinh donViTinh) {
		if (donViTinhService.existsById(donViTinh.getMaDonViTinh())) {
			return donViTinhService.save(donViTinh);
		}
		return null;
	}

	@DeleteMapping(value = "delete-donvitinh/{id}")
	public void deleteDonviTinh(@PathVariable Integer id) {
		donViTinhService.deleteById(id);
	}

	@DeleteMapping(value = "delete-list-donvitinh")
	public int deleteByLstDonViTinh(@RequestBody List<Integer> lstID) {
		int count = 0;
		for (Integer id : lstID) {
			if (donViTinhService.existsById(id)) {
				donViTinhService.deleteById(id);
			}
			count++;
		}
		return count;
	}

	@GetMapping(value = "listAllctyc")
	public List<ChiTietYeuCau> getAllctyc() {
		return chiTietYeuCauServices.findAll();
	}

	@PostMapping(value = "add-ctyc")
	public ChiTietYeuCau addChiTietyeuCau(@RequestBody ChiTietYeuCau chiTietYeuCau) {
		return chiTietYeuCauServices.update(chiTietYeuCau);
	}

	@PutMapping(value = "update-ctyc")
	public ChiTietYeuCau updateChiTietYeuCau(@RequestBody ChiTietYeuCau chiTietYeuCau) {
		if (chiTietYeuCauServices.existsById(chiTietYeuCau.getMaCT())) {
			return chiTietYeuCauServices.update(chiTietYeuCau);
		}
		return null;
	}

	@DeleteMapping(value = "delete-ctyc")
	public void deleteChiTietYeuCau(@PathVariable Integer id) {
		chiTietYeuCauServices.delete(id);
	}

	@DeleteMapping(value = "delete-list-ctyc")
	public int deleteByLstctyc(@RequestBody List<Integer> lstID) {
		int count = 0;
		for (Integer id : lstID) {
			if (chiTietYeuCauServices.existsById(id)) {
				chiTietYeuCauServices.delete(id);
			}
			count++;
		}
		return count;
	}

	@GetMapping(value = "listAllphieuyeucauthietbi")
	public List<PhieuYeuCauThietBi> getPhieuyeucauthietbi() {
		return phieuYeuCauThietBiServices.findAll();
	}

//	@PostMapping(value = "addPhieuyeucauthietbi")
//	public PhieuYeuCauThietBiUpdate addPhieuyeucauthietbi(@RequestBody PhieuYeuCauThietBi phieuYeuCauThietBi)
//	{
//		 );
//	}

//	@GetMapping(value = "list-allphieu")
//	public PhieuYeuCauThietBiUpdate getAllPhieu(@RequestBody PhieuYeuCauThietBiUpdate phieuYeuCauThietBiUpdate)
//	{
//		List<ChiTietYeuCau> listChiTiet = chiTietYeuCauServices.findAll();
//		List<ChiTietYeuCauUpdate> listChiTietupdate = new ArrayList<ChiTietYeuCauUpdate>();
//		for (ChiTietYeuCau list : listChiTiet) {
//			
//		}
//		return null;
//	}

	@PostMapping(value = "add-phieuyeucau")
	public PhieuYeuCauThietBi addPhieuYeuCau(@RequestBody PhieuYeuCauThietBiUpdate data) {
		PhieuYeuCauThietBi phieu = new PhieuYeuCauThietBi(); // entity -> save to PhieuYeuCau
		// set data to Phieu
		phieu.setNgayLapPhieu(new Date());
		phieu.setNhanVien(new NhanVien(data.getNhanVien()));
		phieu.setMucDich(data.getMucDich());
		PhieuYeuCauThietBi phieuMoi = phieuYeuCauThietBiServices.update(phieu);
		List<ChiTietYeuCau> lstCTYeuCau = new ArrayList<ChiTietYeuCau>(); // entitys -> save to ChiTietYeuCau
		// set data lst chi tiet
		for (ChiTietYeuCauUpdate item : data.getChiTietYeuCaus()) {
			ChiTietYeuCau chiTietYeuCau = new ChiTietYeuCau();
			chiTietYeuCau.setPhieuYeuCauThietBi(phieuMoi);

			chiTietYeuCau.setTenThietBi(item.getTenThietBi());
			chiTietYeuCau.setDonViTInh(item.getDonViTInh());
			chiTietYeuCau.setQuyCach_DatTinh(item.getQuyCach_DatTinh());
			chiTietYeuCau.setSoLuong(item.getSoLuong());

			lstCTYeuCau.add(chiTietYeuCau);
		}
		chiTietYeuCauServices.updateByList(lstCTYeuCau);

		return phieuMoi;
	}

	@GetMapping(value = "getByIdPhieuYeucau/{id}")
	public Optional<PhieuYeuCauThietBi> getByIdPhieuYeuCau(@PathVariable int id) {
		return phieuYeuCauThietBiServices.finById(id);
	}

	@GetMapping(value = "getAllPhieuYeuCau")
	public List<PhieuYeuCauThietBi> getAllPhieuYeuCau() {
		return phieuYeuCauThietBiServices.findAll();
	}

	@GetMapping(value = "getAllByIdPhieu/{id}")
	public List<ChiTietYeuCau> getAllByIdPhieu(@PathVariable int id) {
		return chiTietYeuCauServices.getAllByIdPhieu(id);
	}

	@GetMapping(value = "listAllloaiTb")
	public List<LoaiTB> getAllloaiTb() {
		return loaiTBService.findAll();
	}

	@GetMapping(value = "listLoaiTBByIdphongBan/{id}")
	public List<LoaiTB> getAlllaoiTbByIdphongBan(@PathVariable String id) {
		return loaiTBService.getAllByIdPhongBan(id);
	}

	@GetMapping(value = "getAllThietBiPHongBan/{id}")
	public List<ThietBi> getAllThietBiPHongBan(@PathVariable String id) {
		return thietBiServices.getAllByIdthietBiPhongBan(id);
	}

	@GetMapping(value = "getAllNVTBByIdPhongBan/{id}")
	public List<NhanVienRefThietBi> getAllNVTBByIdPhongBan(@PathVariable String id) {
		return NhanVienRefThietBiService.getAllNVTBByIdPhongBan(id);
	}

//	@GetMapping(value = "listAllWithPhongBan/{id}")
//	public List<LuanChuyenOptions> getLuanChuyenOption(@PathVariable String id){
//		List<LuanChuyenOptions> luanchuyen = new ArrayList<LuanChuyenOptions>();
//		List<LoaiTB> listLoai = loaiTBService.getAllByIdPhongBan(id);
//		for (LoaiTB Loai : listLoai) {
//			LuanChuyenOptions luanChuyenOptions = new LuanChuyenOptions();
//			luanChuyenOptions.setLabel(Loai.getMaLoai());
//			List<options> option = new ArrayList<options>();
//			luanChuyenOptions.setOptions(option);
//			List<ThietBi> listTb = Loai.getThietBis();
//			for (ThietBi listthietbi : listTb) {
//				List<NhanVienRefThietBi> tresthietbi = listthietbi.getNvTbs();
//				for (NhanVienRefThietBi thietbis : tresthietbi) {
//					if (thietbis.getDenNgay() == null) {
//						options list = new options();
//						list.setValue(Long.toString(thietbis.getMaThietBi()));
//						list.setLabel(Long.toString(thietbis.getMaThietBi()));
//						option.add(list);
//						break;
//					}
//				}
//			}
//			luanchuyen.add(luanChuyenOptions);	
//		}
//		return luanchuyen;
//			
//		}

	@GetMapping(value = "listThietBiTheoLoai/{maPhongBan}/{maLoai}")
	public List<LuanChuyenOptions> getThietBiTheoLoai(@PathVariable("maPhongBan") String maPhongBan,
			@PathVariable("maLoai") String maLoai) {
		List<LuanChuyenOptions> lcOptions = new ArrayList<LuanChuyenOptions>();
		List<LoaiTB> loai = loaiTBService.getAllThietBimaLoai(maPhongBan, maLoai);
		for (LoaiTB loaiTB : loai) {
			LuanChuyenOptions luanchuyen = new LuanChuyenOptions();
			luanchuyen.setLabel(loaiTB.getTenLoai());
			List<options> option = new ArrayList<options>();
			luanchuyen.setOptions(option);
			List<ThietBi> thietbi = loaiTB.getThietBis();
			for (ThietBi item : thietbi) {
				options list = new options();
				list.setValue(Long.toString(item.getMaThietBi()));
				list.setLabel(loaiTB.getTenLoai() + " " + Long.toString(item.getMaThietBi()));
				option.add(list);
			}
			lcOptions.add(luanchuyen);
		}
		return lcOptions;

	}

	@GetMapping(value = "listAllWithPhongBan/{id}")
	public List<LuanChuyenOptions> getLuanChuyenOption(@PathVariable String id) {
		List<LuanChuyenOptions> luanchuyen = new ArrayList<LuanChuyenOptions>();
		List<LoaiTB> listLoai = loaiTBService.getAllByIdPhongBan(id);
		for (LoaiTB loaiTB : listLoai) {
			LuanChuyenOptions luanChuyenOptions = new LuanChuyenOptions();
			luanChuyenOptions.setLabel(loaiTB.getTenLoai());
			List<options> option = new ArrayList<options>();
			luanChuyenOptions.setOptions(option);
			List<ThietBi> thietbi = loaiTB.getThietBis();
			for (ThietBi thietbis : thietbi) {
				options list = new options();
				list.setValue(Long.toString(thietbis.getMaThietBi()));
				list.setLabel(loaiTB.getTenLoai() + " " + Long.toString(thietbis.getMaThietBi()));
				option.add(list);
			}
			luanchuyen.add(luanChuyenOptions);
		}
		return luanchuyen;

	}

	@GetMapping(value = "listallDanhSachTB")
	public List<DanhSachTB> getDanhSachTB() {
		List<DanhSachTB> danhsach = new ArrayList<DanhSachTB>();
		List<ThietBi> thietbi = thietBiServices.findAll();
		for (ThietBi listThietBi : thietbi) {
			DanhSachTB danh = new DanhSachTB();
			danh.setMaThietBi(listThietBi.getMaThietBi());
			danh.setTenLoai(listThietBi.getLoaiTb().getTenLoai() + " " + listThietBi.getMaThietBi());
			danhsach.add(danh);
		}
		return danhsach;
	}

	@GetMapping(value = "listAllNhanVienThietBi")
	public List<NhanVienRefThietBi> getNhanVienRefThietBi() {
		return NhanVienRefThietBiService.findAll();
	}

	public String getTimestame() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		return String.valueOf(timestamp.getTime());
	}

	@GetMapping("get-lst-thietbi-of-nhanvien/{maNhanVien}")
	public long[] getListMaThietBiOfNhanVien(@PathVariable String maNhanVien) {
		try {
			return thietBiServices.getListMaThietBiOfNhanVien(maNhanVien);
		} catch (Exception e) {
			return null;
		}
	}

	@PutMapping(value = "update-nhanvien-ref-thietbi")
	@Transactional
	public PhieuBanGiao updateNhanVienRefThietBi(@RequestBody DataUpdateNhanVienThietBi data, Principal principal) {
		// create list contain recore update
		List<NhanVienRefThietBi> lstUpdate = new ArrayList<NhanVienRefThietBi>();
		List<NhanVienRefThietBi> lstNew = new ArrayList<NhanVienRefThietBi>();
		// Create new PhieuBanGiao
		PhieuBanGiao phieuBanGiao = new PhieuBanGiao();
		phieuBanGiao.setNgayBanGiao(new Date());
		phieuBanGiao.setNguoiBanGiao(data.getMaNhanVien());
		phieuBanGiao.setNoiDungBanGiao(data.getNoiDungBanGiao());
		PhieuBanGiao phieuRes = phieuBanGiaoService.save(phieuBanGiao);
		//
		int count = 0; // dung dem so luong thiet bi
		String dsTenThietBi = ""; // dung get ten thietbi de thong bao

		// for
		for (long maTB : data.getLstThietBi()) {
			// check in phongban
			NhanVien nhanVienCheck = nhanVienService.getNhanVienByMaThietBi(maTB);

			if (nhanVienCheck.getMaNhanVien().equals(data.getMaNhanVien())) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NHAN_VIEN_DA_SO_HUU_THIETBI");
			}

			// create new recore
			NhanVienRefThietBiPK key = new NhanVienRefThietBiPK(data.getMaNhanVien(), maTB, phieuRes.getMaBanGiao());
			NhanVienRefThietBi object = new NhanVienRefThietBi(key, new Date(),
					data.getKieuBanGiao().equals("ca_nhan") == true ? true : false, phieuRes);
			object.setTimestame(this.getTimestame());
			lstNew.add(object);

			// update old recore
			NhanVienRefThietBi recoreOld = NhanVienRefThietBiService.getAllMathietbi(maTB);
			if (recoreOld != null) {
				recoreOld.setDenNgay(new Date());
				lstUpdate.add(recoreOld);
			} else {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "LUAN_CHUYEN_CONFLICT_DENNGAY");
			}

			// -------------------------
			// count
			count++;
			dsTenThietBi += thietBiServices.getTenThietBi(maTB) + ", ";

		}
		NhanVienRefThietBiService.updateAll(lstUpdate);
		NhanVienRefThietBiService.updateAll(lstNew);

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
		notification.setContents("Luân chuyển " + count + " thiết bị cho " + nhanVien.getTenNhanVien() + ", gồm "
				+ dsTenThietBi + " ...");
		notification.setNotificationType("NOTIFI_LUANCHUYEN");
		notification.setCode(String.valueOf(phieuRes.getMaBanGiao()));
		notificationsService.save(notification);
		// end add notification

		return phieuBanGiao;
	}

	@GetMapping(value = "lstMathietbi/{id}")
	public NhanVienRefThietBi getAllMathietbi(@PathVariable long id) {
		return NhanVienRefThietBiService.getAllMathietbi(id);
	}

	@GetMapping(value = "listNhanVienRefPhongBan/{maPhongBan}")
	public List<NhanVien> getNhanVienRefPhongBan(@PathVariable String maPhongBan) {
		return nhanVienService.getNhanVienRefPhongBan(maPhongBan);
	}

	@GetMapping(value = "getByIdThietBi/{id}")
	public PhongBan getByIdThietBi(@PathVariable long id) {
		return phongBanService.getByIdThietBi(id);
	}

	@GetMapping(value = "getThietBiIdPhongBan/{id}")
	public List<LuanChuyenOptions> getThietBiIdPhongBan(@PathVariable String id) {
		List<LuanChuyenOptions> lstLuanChuyen = new ArrayList<LuanChuyenOptions>();

		List<ThietBi> lstThietBi = thietBiServices.getThietBiIdPhongBan(id);

		for (ThietBi tb : lstThietBi) {
			String maLoaiCheck = tb.getMaLoai();

			options opt = new options();
			opt.setLabel(tb.getLoaiTb().getTenLoai() + " " + String.valueOf(tb.getMaThietBi()));
			opt.setValue(String.valueOf(tb.getMaThietBi()));
			List<TinhTrangRefThietBi> ttTb = tb.getTtTbs();
			for (TinhTrangRefThietBi ttrefthietBi : ttTb) {
				if (tb.getMaThietBi() == ttrefthietBi.getThietBi().getMaThietBi()) {
					opt.setTenTinhTrang(ttrefthietBi.getTinhTrang().getTenTinhTrang());
					opt.setMoTa(ttrefthietBi.getTinhTrang().getMoTa());
				}
			}
			boolean check = false;
			for (LuanChuyenOptions lc : lstLuanChuyen) {
				if (maLoaiCheck.equals(lc.getValue())) {
					lc.getOptions().add(opt);
					check = true;
				}
			}
			if (check == false) {
				LoaiTB loaiTB = loaiTBService.findByID(tb.getMaLoai());
				LuanChuyenOptions lcOT = new LuanChuyenOptions();
				lcOT.setLabel(loaiTB.getTenLoai());
				lcOT.setValue(loaiTB.getMaLoai());
				List<options> lstOpt = new ArrayList<options>();
				lstOpt.add(opt);
				lcOT.setOptions(lstOpt);
				lstLuanChuyen.add(lcOT);
			}
		}
		return lstLuanChuyen;
	}

	public boolean checkExistsMaLoai(String maLoai, List<LuanChuyenOptions> lstLuanChuyen) {
		for (LuanChuyenOptions lc : lstLuanChuyen) {
			if (maLoai.equals(lc.getValue())) {
				return true;
			}
		}
		return false;
	}

	@GetMapping(value = "listThietBiIdPhongBanIdLoai/{maPhongBan}/{maLoai}")
	public List<LuanChuyenOptions> getThietBiIdPhongBanIdLoai(@PathVariable("maPhongBan") String maPhongBan,
			@PathVariable("maLoai") String maLoai) {
		List<LuanChuyenOptions> lstLuanChuyen = new ArrayList<LuanChuyenOptions>();
		List<ThietBi> lstThietBi = thietBiServices.getThietBiIdPhongBanIdLoai(maPhongBan, maLoai);
		for (ThietBi thietBi : lstThietBi) {
			String chectMaloai = thietBi.getMaLoai();
			options opt = new options();
			opt.setLabel(thietBi.getLoaiTb().getTenLoai() + " " + String.valueOf(thietBi.getMaThietBi()));
			opt.setValue(String.valueOf(thietBi.getMaThietBi()));
			List<TinhTrangRefThietBi> ttTb = thietBi.getTtTbs();
			for (TinhTrangRefThietBi ttrefthietBi : ttTb) {
				if (thietBi.getMaThietBi() == ttrefthietBi.getThietBi().getMaThietBi()) {
					opt.setTenTinhTrang(ttrefthietBi.getTinhTrang().getTenTinhTrang());
					opt.setMoTa(ttrefthietBi.getTinhTrang().getMoTa());
				}
			}
			boolean check = false;
			for (LuanChuyenOptions lc : lstLuanChuyen) {
				if (chectMaloai.equals(lc.getValue())) {
					lc.getOptions().add(opt);
					check = true;
				}
			}
			if (check == false) {
				LoaiTB loaiTB = loaiTBService.findByID(thietBi.getMaLoai());
				LuanChuyenOptions lcOT = new LuanChuyenOptions();
				lcOT.setLabel(loaiTB.getTenLoai());
				lcOT.setValue(loaiTB.getMaLoai());
				List<options> lstOpt = new ArrayList<options>();
				lstOpt.add(opt);
				lcOT.setOptions(lstOpt);
				lstLuanChuyen.add(lcOT);
			}
		}
		return lstLuanChuyen;
	}

	@GetMapping(value = "listAllThietBi")
	public List<DisplayThietBi> getAllThietBi() {
		List<DisplayThietBi> hienthiTB = new ArrayList<DisplayThietBi>();
		List<ThietBi> resthietbi = thietBiServices.findAll();
		for (ThietBi thietBi : resthietbi) {
			String tt = "";
			List<TinhTrangRefThietBi> tinhtrangrefthietbi = thietBi.getTtTbs();
			for (TinhTrangRefThietBi ttreftb : tinhtrangrefthietbi) {
				tt = ttreftb.getTinhTrang().getTenTinhTrang();
			}

//			List<NhanVienRefThietBi> nhanvienrefthietbi = thietBi.getNvTbs();
//			for (NhanVienRefThietBi nvreftb : nhanvienrefthietbi) {
//				if (thietBi.getMaThietBi() == nvreftb.getMaThietBi() && nvreftb.getDenNgay() == null) {
//					phongBan = nvreftb.getNhanVien().getPhongBan().getTenPhongBan();
//				}
//			}
			String phongBan = "Kho";
			PhongBan phongBanObject = phongBanService.getByIdThietBi(thietBi.getMaThietBi());
			if (phongBanObject != null)
				phongBan = phongBanObject.getMaPhongBan();

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			// NhaCung Cap
			NhaCungCap nhaCungCap = nhaCungCapService.getNhaCungCapByMaLoaiCon(thietBi.getMaLoai());
			hienthiTB.add(new DisplayThietBi(nhaCungCap.getMaNCC() + thietBi.getMaLoai() + thietBi.getMaThietBi(),
					thietBi.getLoaiTb().getTenLoai(), thietBi.getBaoHanh(), thietBi.getGiaTri(), thietBi.getKhauHao(),
					"" + sdf.format(thietBi.getNgayNhap()), thietBi.getDonViTinh().getTenDonViTinh(), phongBan, tt));
		}
		return hienthiTB;
	}

	@GetMapping(value = "listallThietBiByPhieuThanhLy")
	public List<DisplayThietBi> getAllThietBiByPhieuThanhLy() {
		List<DisplayThietBi> hienthiTB = new ArrayList<DisplayThietBi>();
		List<ThietBi> resthietbi = thietBiServices.getAllThietBiByPhieuThanhLy();
		for (ThietBi thietBi : resthietbi) {
			String tt = "";
			List<TinhTrangRefThietBi> tinhtrangrefthietbi = thietBi.getTtTbs();
			for (TinhTrangRefThietBi ttreftb : tinhtrangrefthietbi) {
				tt = ttreftb.getTinhTrang().getTenTinhTrang();
			}
//			String phongBan = "";
//			List<NhanVienRefThietBi> nhanvienrefthietbi = thietBi.getNvTbs();
//			for (NhanVienRefThietBi nvreftb : nhanvienrefthietbi) {
//				if (thietBi.getMaThietBi() == nvreftb.getMaThietBi() && nvreftb.getDenNgay() == null) {
//					phongBan = nvreftb.getNhanVien().getPhongBan().getTenPhongBan();
//				}
//			}

			String phongBan = "Kho";
			PhongBan phongBanObject = phongBanService.getByIdThietBi(thietBi.getMaThietBi());
			if (phongBanObject != null)
				phongBan = phongBanObject.getMaPhongBan();

			// NhaCung Cap
			NhaCungCap nhaCungCap = nhaCungCapService.getNhaCungCapByMaLoaiCon(thietBi.getMaLoai());
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			hienthiTB.add(new DisplayThietBi(nhaCungCap.getMaNCC() + thietBi.getMaLoai() + thietBi.getMaThietBi(),
					thietBi.getLoaiTb().getTenLoai(), thietBi.getBaoHanh(), thietBi.getGiaTri(), thietBi.getKhauHao(),
					"" + sdf.format(thietBi.getNgayNhap()), thietBi.getDonViTinh().getTenDonViTinh(), phongBan, tt));
		}
		return hienthiTB;
	}

	@GetMapping(value = "listallThietBiByTinhTrang")
	public List<DisplayThietBi> getAllThietBiByTinhTrang() {
		List<DisplayThietBi> hienthiTB = new ArrayList<DisplayThietBi>();
		List<ThietBi> resthietbi = thietBiServices.getAllThietBiByTinhTrang();
		;
		for (ThietBi thietBi : resthietbi) {
			String tt = "";
			List<TinhTrangRefThietBi> tinhtrangrefthietbi = thietBi.getTtTbs();
			for (TinhTrangRefThietBi ttreftb : tinhtrangrefthietbi) {
				tt = ttreftb.getTinhTrang().getTenTinhTrang();
			}
//			String phongBan = "";
//			List<NhanVienRefThietBi> nhanvienrefthietbi = thietBi.getNvTbs();
//			for (NhanVienRefThietBi nvreftb : nhanvienrefthietbi) {
//				if (thietBi.getMaThietBi() == nvreftb.getMaThietBi() && nvreftb.getDenNgay() == null) {
//					phongBan = nvreftb.getNhanVien().getPhongBan().getTenPhongBan();
//				}
//			}

			String phongBan = "Kho";
			PhongBan phongBanObject = phongBanService.getByIdThietBi(thietBi.getMaThietBi());
			if (phongBanObject != null)
				phongBan = phongBanObject.getMaPhongBan();

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			// NhaCung Cap
			NhaCungCap nhaCungCap = nhaCungCapService.getNhaCungCapByMaLoaiCon(thietBi.getMaLoai());

			hienthiTB.add(new DisplayThietBi(nhaCungCap.getMaNCC() + thietBi.getMaLoai() + thietBi.getMaThietBi(),
					thietBi.getLoaiTb().getTenLoai(), thietBi.getBaoHanh(), thietBi.getGiaTri(), thietBi.getKhauHao(),
					"" + sdf.format(thietBi.getNgayNhap()), thietBi.getDonViTinh().getTenDonViTinh(), phongBan, tt));
		}
		return hienthiTB;
	}

	@GetMapping(value = "listLoaitb")
	public List<LoaiTB> getLoaitb() {
		return loaiTBService.findAll();
	}

	@GetMapping(value = "list-thietbi-by-nhanvien/{maNhanVien}")
	public List<DSTBByNhanVien> getThietbiByNhanVien(@PathVariable String maNhanVien) {
		List<DSTBByNhanVien> dstbnv = new ArrayList<DSTBByNhanVien>();
		List<ThietBi> dsThietBi = thietBiServices.getThietBiByNhanVien(maNhanVien);
		for (ThietBi thietBi : dsThietBi) {
			// NhaCung Cap
			NhaCungCap nhaCungCap = nhaCungCapService.getNhaCungCapByMaLoaiCon(thietBi.getMaLoai());

			String tinhtrang = tinhTrangService.getTinhTrangByITb(thietBi.getMaThietBi());
			String tenNhaCungCap = nhaCungCapService.getNhanCungCapByLoai(thietBi.getMaLoai());
			String tenNhanVien = nhanVienService.getNhanVienByID(maNhanVien);
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			DSTBByNhanVien newObject = new DSTBByNhanVien(thietBi.getLoaiTb().getTenLoai(), tenNhanVien,
					String.valueOf(thietBi.getGiaTri()), String.valueOf(thietBi.getKhauHao()),
					sdf.format(thietBi.getNgayNhap()), String.valueOf(thietBi.getBaoHanh()), tinhtrang, tenNhaCungCap);
			newObject.setMaThietBi(nhaCungCap.getMaNCC() + thietBi.getMaLoai() + thietBi.getMaThietBi());
			dstbnv.add(newObject);

		}
		return dstbnv;
	}

}
