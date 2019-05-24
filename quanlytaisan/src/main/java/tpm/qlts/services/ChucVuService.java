package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.ChucVu;
import tpm.qlts.repositorys.ChucVuRepository;

@Service("chucVuService")
public class ChucVuService {
	@Autowired 
	private ChucVuRepository chucVuRepository;
	
	public void deleteById(int id)
	{
		chucVuRepository.deleteById(id);
	}
	
	public  ChucVu update(ChucVu chucVu) {
		return chucVuRepository.save(chucVu);
	}
	
	public Optional<ChucVu> findById(int id)
	{
		return chucVuRepository.findById(id);
	}
	
	public List<ChucVu> findAll()
	{
		return (List<ChucVu>) chucVuRepository.findAll();
	}
	
	public Boolean existById(int id) {
		return chucVuRepository.existsById(id);
	}
}
