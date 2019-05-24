package tpm.qlts.services;



import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import tpm.qlts.entitys.BienNhanThietBi;
import tpm.qlts.repositorys.BienNhanThietBiRepository;

@Service("bienNhanThietBiServices")
public class BienNhanThietBiServices {
	@Autowired
	private BienNhanThietBiRepository bienNhanThietBiRepository;
	
	public BienNhanThietBi update(BienNhanThietBi bn)
	{
		return bienNhanThietBiRepository.save(bn);
	}
	
	public void delete(String id) {
		bienNhanThietBiRepository.deleteById(id);
	}
	
	public Iterable<BienNhanThietBi> findAll()
	{
		return bienNhanThietBiRepository.findAll();
	}
	
	public Optional<BienNhanThietBi> findByID(String id)
	{
		return bienNhanThietBiRepository.findById(id);
	}
	
}
