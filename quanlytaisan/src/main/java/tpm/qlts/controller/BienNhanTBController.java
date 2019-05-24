package tpm.qlts.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpm.qlts.comporator.PhieuBienNhanComporator;
import tpm.qlts.entitys.BienNhanThietBi;
import tpm.qlts.entitys.ChiTiet;
import tpm.qlts.services.BienNhanThietBiServices;
import tpm.qlts.services.ChiTietServices;

@Controller
@RestController
@RequestMapping("bien-nhan")
public class BienNhanTBController{
	
	@Autowired
	BienNhanThietBiServices bienNhanService;
	
	@Autowired
	ChiTietServices chiTietService;
	
	@GetMapping("get-all-biennhan-tb")
	public Iterable<BienNhanThietBi> getAllBienNhanThietBi() {
		List<BienNhanThietBi> lst = (List<BienNhanThietBi>) bienNhanService.findAll();
		Collections.sort(lst, new PhieuBienNhanComporator());
		return lst;
	}
	
	@GetMapping("get-chitiet-of-biennhan/{maBienNhan}")
	public List<ChiTiet> getAllChiTietBienNhan(@PathVariable String maBienNhan) {
		return chiTietService.getChiTietBienNhanByBienNhan(maBienNhan);
	}
	
	
	public void getAllThietBiInChiTietBienNhan() {
		
	}
}
