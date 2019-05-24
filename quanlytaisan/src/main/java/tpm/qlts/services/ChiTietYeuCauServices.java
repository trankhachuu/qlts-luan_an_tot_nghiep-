package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.ChiTietYeuCau;
import tpm.qlts.repositorys.ChiTietYeuCauRepository;

@Service("chiTietYeuCauServices")
public class ChiTietYeuCauServices {
	@Autowired
	private ChiTietYeuCauRepository chiTietYeuCauRepository;
	
	public ChiTietYeuCau update(ChiTietYeuCau ctyc)
	{
		return chiTietYeuCauRepository.save(ctyc);
	}
	
	public Iterable<ChiTietYeuCau> updateByList(List<ChiTietYeuCau> entities) {
		return chiTietYeuCauRepository.saveAll(entities);
	}
	
	public void delete(Integer id)
	{
		chiTietYeuCauRepository.deleteById(id);
	}
	public List<ChiTietYeuCau> findAll()
	{
		return (List<ChiTietYeuCau>) chiTietYeuCauRepository.findAll();
	}
	
	public Optional<ChiTietYeuCau> findById(Integer id)
	{
		return chiTietYeuCauRepository.findById(id);
	}
	
	public boolean existsById(Integer id)
	{
		return chiTietYeuCauRepository.existsById(id);
	}
	
	public List<ChiTietYeuCau> getAllByIdPhieu(int id)
	{
		return chiTietYeuCauRepository.getAllByIdPhieu(id);
	}
}
