package tpm.qlts.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.GeneralChiMuc;
import tpm.qlts.repositorys.ChiMucLoaiRepository;

@Service("chiMucLoaiService")
public class ChiMucLoaiService {
	@Autowired
	public ChiMucLoaiRepository chiMucLoaiRepository;

	public GeneralChiMuc getChiMucChu() {
		return chiMucLoaiRepository.getChiMucChu();
	}

	public int getChiMucSo() {
		return chiMucLoaiRepository.getChiMucSo();
	}
	
	public Iterable<GeneralChiMuc> findAll() {
		return chiMucLoaiRepository.findAll();
	}
}
