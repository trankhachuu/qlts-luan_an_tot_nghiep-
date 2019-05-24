package tpm.qlts.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.repositorys.TinhTrangRepositoryByNam;

@Service("tinhTrangServiceByNam")
public class TinhTrangServiceByNam extends TinhTrangService{
	@Autowired
	TinhTrangRepositoryByNam tinhTrangRepository;
	
	public String getMaTinhTrangByIDThietBi(long idThietBi) {
		return tinhTrangRepository.getMaTinhTrangByIDThietBi(idThietBi);
	}
}
