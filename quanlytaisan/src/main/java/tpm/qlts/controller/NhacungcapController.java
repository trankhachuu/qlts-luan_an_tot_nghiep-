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

import tpm.qlts.entitys.NhaCungCap;
import tpm.qlts.services.NhaCungCapService;
@Controller
@RestController
@RequestMapping("nhacungcap")
public class NhacungcapController {
	@Autowired
	private NhaCungCapService nhaCungCapService;
	
	@GetMapping("getall")
	public List<NhaCungCap> getAll()
	{
		return (List<NhaCungCap>)nhaCungCapService.findAll();
	}
	@PostMapping("add-nhacungcap")
	public NhaCungCap newNhaCungCap(@RequestBody NhaCungCap ncc)
	{
		return nhaCungCapService.update(ncc);
	}
	
	@PutMapping("update-nhacungcap")
	public NhaCungCap updateNhaCungCap(@RequestBody NhaCungCap ncc)
	{
		if(nhaCungCapService.existsById(ncc.getMaNCC()))
		{
			return nhaCungCapService.update(ncc);
		}
		else
			return null;
	}
	
	@DeleteMapping("delete/{id}")
	public void deleteNhaCungCap(@PathVariable String id)
	{
		if(nhaCungCapService.existsById(id))
			nhaCungCapService.deleteById(id);
	}
	
	@DeleteMapping("delete-by-list")
	public int deletebylist(@RequestBody List<String> lstID)
	{
		int count = 0;
		for(String id : lstID) {
			if(nhaCungCapService.existsById(id))
				nhaCungCapService.deleteById(id);
			count ++;
		}
		return count;
	}
	@GetMapping("findbyID/{id}")
	public NhaCungCap findByID(@PathVariable String id)
	{
		return nhaCungCapService.findById(id);
	}
}