package tpm.qlts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpm.qlts.entitys.LoaiTB;
import tpm.qlts.entitys.NhaCungCap;
import tpm.qlts.services.LoaiTBService;
import tpm.qlts.services.NhaCungCapService;

@Controller
@RestController
@RequestMapping("loaitb")
public class LoaiTBController {
	
	@Autowired
	private LoaiTBService loaiTBService;
	
	@Autowired
	private NhaCungCapService nhaccService;
	
	@GetMapping("listtb")
	public List<LoaiTB> getallloaitb(){
		return (List<LoaiTB>)loaiTBService.getLoaiTBCha();
	}
	
	@GetMapping("listtbcha")
	public List<LoaiTB> getallloaitbcha(){
		return (List<LoaiTB>)loaiTBService.getloaicha();
	}
	@PostMapping("addloaitb")
	public LoaiTB newloaitb(@RequestBody LoaiTB ltt)
	{
		NhaCungCap ncc = nhaccService.findById(ltt.getMaNCC());
		String maLoaiCha = ltt.getMaLoaiCha();
		ltt.setNhaCungCap(ncc);
		ltt.setLoaiTb(loaiTBService.findByID(maLoaiCha));
		return loaiTBService.update(ltt);
	}
	
	@PutMapping("updateloaitb")
	public LoaiTB updateLoaitb(@RequestBody LoaiTB ltt1)
	{
		if(loaiTBService.exitbyId(ltt1.getMaLoai()))
		{
			return loaiTBService.update(ltt1);
		}
		else
			return null;
	}
	
	@GetMapping("gettentbbyloaitb/{id}")
	public List<LoaiTB> gettenloai(@PathVariable("id") String id){
		return loaiTBService.gettenloaibyloaicha(id);
	}
	
	@DeleteMapping("xoabyID/{id}")
	public void deleteloaitb(@PathVariable String id)
	{
		if(loaiTBService.exitbyId(id))
			loaiTBService.deletebyId(id);
	}
	
	@DeleteMapping("xoatheolist")
	public int deletebylist(@RequestBody List<String> lstid)
	{
		int count = 0;
		for(String id: lstid)
		{
			if(loaiTBService.exitbyId(id))
				loaiTBService.deletebyId(id);
			count ++;
		}
		return count;
	}
	
	@GetMapping("list-loaitb-bynhacungcap/{maNCC}")
	public List<LoaiTB> getAllLoaiTBByNhaCungCap(@PathVariable String maNCC){
		return loaiTBService.getAllLoaiTBByNhaCungCap(maNCC);
	}
	
}
