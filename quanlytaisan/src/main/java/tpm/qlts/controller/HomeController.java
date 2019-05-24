package tpm.qlts.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import tpm.qlts.comporator.NotificationComporator;
import tpm.qlts.entitys.Notifications;
import tpm.qlts.services.NhaCungCapService;
import tpm.qlts.services.NhanVienService;
import tpm.qlts.services.NotificationsService;
import tpm.qlts.services.PhongBanService;
import tpm.qlts.services.ThietBiServices;

@Controller
@RestController
@RequestMapping("home")
public class HomeController {

	@Autowired
	private NotificationsService notificationsService;

	@Autowired
	private ThietBiServices thietBiService;

	@Autowired
	private NhaCungCapService nhaCungCapService;

	@Autowired
	private NhanVienService nhanVienService;

	@Autowired
	private PhongBanService phongBanService;

	@RequestMapping(value = "conmeo", method = RequestMethod.GET)
	public String hello() {
		return "Xin chào";
	}

	@GetMapping("get-all-thongbao")
	public List<Notifications> getAllThongBao() {
		List<Notifications> objectNotification = notificationsService.findAll();
		Collections.sort(objectNotification, new NotificationComporator());
		return objectNotification;
	}

	@GetMapping("get-tong-thietbi")
	public int getMaxThietBi() {
		return thietBiService.getMaxThietBi();
	}

	@GetMapping("get-tong-nhacungcap")
	public int getTongNhaCungCap() {
		return nhaCungCapService.getTongNhaCungCap();
	}

	@GetMapping("get-tong-nhanvien")
	public int getTongNhanVien() {
		return nhanVienService.getTongNhanVien();
	}

	@GetMapping("get-tong-phongban")
	public int getTongPhongBan() {
		return phongBanService.getTongPhongBan();
	}
}
