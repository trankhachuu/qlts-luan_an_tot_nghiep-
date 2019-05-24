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

import tpm.qlts.entitys.PhongBan;
import tpm.qlts.services.PhongBanService;


@Controller
@RestController
@RequestMapping("phongban")
public class PhongBanController {

		@Autowired
		private PhongBanService phongBanService;
			
			@GetMapping("getall-phongban")
			public List<PhongBan> getAll()
			{
				return (List<PhongBan>) phongBanService.findAll();
			}
			
			@PostMapping("add-phongban")
			public PhongBan newPhongBan(@RequestBody PhongBan pb)
			{
				 return phongBanService.update(pb);	
			}
			@PutMapping("update-phongban")
			public PhongBan updatePhongBan(@RequestBody PhongBan pb)
			{
			if(phongBanService.existsById(pb.getMaPhongBan()))
			{
				return phongBanService.update(pb);
			}
			else
				return null;
			}
			@DeleteMapping("delete-phongban/{id}")
			public void deletePhongBan(@PathVariable String id)
			{
				if(phongBanService.existsById(id))
					phongBanService.deleteById(id);
			}
			@DeleteMapping("delete-by-list")
			public int deleteByListPhongBan (@RequestBody List<String> listID)
			{
				int count = 0;
				for(String id : listID)
				{
						if(phongBanService.existsById(id)== true)
						{
							phongBanService.deleteById(id);
						}
						count++;
				}
				return count;
			}

			}

