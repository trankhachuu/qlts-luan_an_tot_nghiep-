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

import tpm.qlts.entitys.ChucVu;
import tpm.qlts.services.ChucVuService;

@Controller
@RestController
@RequestMapping("chucvu")
public class ChucvuController {
	@Autowired
	private ChucVuService chucVuService;
	
	// Crud table position
	
	@GetMapping("index")
	private String index() {
		return "Chucvu API by Manh, Nguyen Van.";
	}
	
	@PostMapping("add-chucvu")
	public ChucVu addChucVu(@RequestBody  ChucVu chucvu){
		return chucVuService.update(chucvu);
	}
	
	@PutMapping("update-chucvu")
	public ChucVu updateChucVu(@RequestBody ChucVu chucvu )
	{
		if(chucVuService.existById(chucvu.getMaChucVu()))
		{
			return chucVuService.update(chucvu);
		}
		else
		{
			return null;
		}
	}
	
	@DeleteMapping("delete-Chucvu/{id}")
	public void deleteChucvu(@PathVariable int id)
	{
		if(chucVuService.existById(id))	
			chucVuService.deleteById(id);
	}
	
	@DeleteMapping("deletebylist")
	public int deleteByList(@RequestBody List<Integer> lstId)
	{
		int count = 0;
		for (Integer id : lstId) {
			if (chucVuService.existById(id)) {
				chucVuService.deleteById(id);
				count ++;
			}
			
		}
		return count;
	}
	
	@GetMapping("listchucvu")
	public List<ChucVu> getAll()
	{
		return (List<ChucVu>) chucVuService.findAll();
	}
}