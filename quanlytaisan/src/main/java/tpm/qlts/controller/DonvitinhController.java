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

import tpm.qlts.entitys.DonViTinh;
import tpm.qlts.services.DonViTinhServices;



@Controller
@RestController
@RequestMapping("donvitinh")
public class DonvitinhController {
	
	@Autowired
	private DonViTinhServices donViTinhServices;
	
	@GetMapping("index")
	private String index()
	{
		return "Chucvu API by Manh, Nguyen Van.";
	}
	
	
	@PostMapping("add-dvt")
	public DonViTinh adddvt(@RequestBody DonViTinh dvt)
	{
		return donViTinhServices.update(dvt);
	}
	
	@PutMapping("updatedvt")
	public DonViTinh updateDonViTinh(@RequestBody DonViTinh dvt)
	{
		if(donViTinhServices.existById(dvt.getMaDonViTinh()))
		{
			return donViTinhServices.update(dvt);
		}
		else
		{
			return null;
		}
	}
	
	@DeleteMapping("xoa-dvt/{id}")
	public void deletedvt(@PathVariable int id)
	{
		if(donViTinhServices.existById(id))
			donViTinhServices.deleteByID(id);
	}
	
	@DeleteMapping("xoadvtbylist")
	public int delebylist(@RequestBody List<Integer> lisID)
	{
		int count = 0;
		for(Integer id: lisID) {
			if(donViTinhServices.existById(id))
				donViTinhServices.deleteByID(id);
			count ++;
		}
		return count;
	}
	
	@GetMapping("listdvt")
	public List<DonViTinh> getAll()
	{
		return (List<DonViTinh>) donViTinhServices.findAll();
	}
}
