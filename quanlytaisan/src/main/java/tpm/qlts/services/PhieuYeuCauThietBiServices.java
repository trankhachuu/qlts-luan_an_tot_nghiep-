package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.PhieuYeuCauThietBi;
import tpm.qlts.repositorys.PhieuYeuCauThietBiRepository;

@Service("phieuYeuCauThietBiServices")
public class PhieuYeuCauThietBiServices {
	@Autowired
	private PhieuYeuCauThietBiRepository phieuYeuCauThietBiRepository;
	
	public PhieuYeuCauThietBi update(PhieuYeuCauThietBi pyc)
	{
		return phieuYeuCauThietBiRepository.save(pyc);
	}
	
	public void delete(Integer id)
	{
		phieuYeuCauThietBiRepository.deleteById(id);
	}
	
	public List<PhieuYeuCauThietBi> findAll()
	{
		return (List<PhieuYeuCauThietBi>) phieuYeuCauThietBiRepository.findAll();
	}
	
	public Optional<PhieuYeuCauThietBi> finById(int id)
	{
		return phieuYeuCauThietBiRepository.findById(id);
	}
	
}
