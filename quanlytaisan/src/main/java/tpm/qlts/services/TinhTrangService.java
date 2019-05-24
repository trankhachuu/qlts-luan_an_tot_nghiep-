package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.TinhTrang;
import tpm.qlts.repositorys.TinhTrangRepository;

@Service("tinhTrangService")
@Primary
public class TinhTrangService {
	@Autowired
	private TinhTrangRepository tinhTrangRepository;

	public void deleteById(String id) {
		tinhTrangRepository.deleteById(id);
	}

	public List<TinhTrang> findAll() {
		return (List<TinhTrang>) tinhTrangRepository.findAll();
	}

	public TinhTrang findById(String id) {
		Optional<TinhTrang> s = tinhTrangRepository.findById(id);
		if(s.isPresent())
			return s.get();
		return null;
	}
	
	public Optional<TinhTrang> findById1(String id) {
		return tinhTrangRepository.findById(id);
	}

	public TinhTrang update(TinhTrang tinhTrang) {
		return tinhTrangRepository.save(tinhTrang);
	}

	public boolean exitstsById(String id) {
		return tinhTrangRepository.existsById(id);
	}

	public String getTenTinhTrangByIDThietBi(long idThietBi) {
		return tinhTrangRepository.getTenTinhTrangByIDThietBi(idThietBi);
	}
	
	public String getTinhTrangByITb(long maThietBi) {
		return tinhTrangRepository.getTinhTrangByITb(maThietBi);
	}
}
