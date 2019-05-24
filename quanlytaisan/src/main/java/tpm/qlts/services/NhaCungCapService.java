package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.NhaCungCap;
import tpm.qlts.repositorys.NhaCungCapRepository;

@Service("nhaCungCapService")
public class NhaCungCapService {
	@Autowired
	private NhaCungCapRepository nhaCungCapRepository;

	public void deleteById(String id) {
		nhaCungCapRepository.deleteById(id);
	}

	public NhaCungCap update(NhaCungCap ncc) {
		return nhaCungCapRepository.save(ncc);
	}

	public NhaCungCap findById(String id) {
		Optional<NhaCungCap> a = nhaCungCapRepository.findById(id);
		if (a.isPresent()) {
			return a.get();
		} else {
			return null;
		}

	}

	public List<NhaCungCap> findAll() {
		return (List<NhaCungCap>) nhaCungCapRepository.findAll();
	}

	public boolean existsById(String id) {
		return nhaCungCapRepository.existsById(id);
	}
	
	public NhaCungCap getNhaCungCapByMaLoaiCon(String maLoaiCon) {
		return nhaCungCapRepository.getNhaCungCapByMaLoaiCon(maLoaiCon);
	}
	
	public int getTongNhaCungCap() {
		return nhaCungCapRepository.getTongNhaCungCap();
	}
	
	public String getNhanCungCapByLoai(String maLoai) {
		return nhaCungCapRepository.getNhanCungCapByLoai(maLoai);
	}
}
