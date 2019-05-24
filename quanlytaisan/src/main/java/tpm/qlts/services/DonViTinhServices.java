package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.DonViTinh;
import tpm.qlts.repositorys.DonViTInhRepository;

@Service("donViTinhServices")
public class DonViTinhServices {
	
	@Autowired
	private DonViTInhRepository donViTinhRepository;
	
	public DonViTinh update(DonViTinh dvt)
	{
		return donViTinhRepository.save(dvt);
	}
	
	public void deleteByID(int id)
	{
		donViTinhRepository.deleteById(id);
	}
	
	public Optional<DonViTinh> findById(int id)
	{
		return donViTinhRepository.findById(id);
	}
	public List<DonViTinh> findAll()
	{
		return (List<DonViTinh>) donViTinhRepository.findAll();
	}
	
	public Boolean existById(int id) {
		return donViTinhRepository.existsById(id);
	}
	
}
