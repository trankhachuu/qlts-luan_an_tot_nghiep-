package tpm.qlts.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.ChiTiet;
import tpm.qlts.repositorys.ChiTietRepository;

@Service("ChiTietServices")
public class ChiTietServices {
	@Autowired
	private ChiTietRepository chiTietRepository;
	
	public ChiTiet update(ChiTiet ct)
	{
		return chiTietRepository.save(ct);
	}
	
	public void delete(Integer id) {
		chiTietRepository.deleteById(id);;
	}
	
	public Iterable<ChiTiet> findAll()
	{
		return chiTietRepository.findAll();
	}
	
	public Optional<ChiTiet> findByID(Integer id)
	{
		return chiTietRepository.findById(id);
	}
	
	public List<ChiTiet> updateAll(Iterable<ChiTiet> cts)
	{
		return chiTietRepository.saveAll(cts);
	}
	
	public List<ChiTiet> getChiTietBienNhanByBienNhan(String maBienNhan){
		return chiTietRepository.getChiTietBienNhanByBienNhan(maBienNhan);
	}
	
}
