package tpm.qlts.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.PhieuBanGiao;
import tpm.qlts.repositorys.PhieuBanGiaoRepository;

@Service("phieuBanGiaoService")
public class PhieuBanGiaoService {
	
	@Autowired
	PhieuBanGiaoRepository phieuBanGiaoRepository;
	
	public PhieuBanGiao save(PhieuBanGiao p) {
		return phieuBanGiaoRepository.save(p);
	}
	
	public List<PhieuBanGiao> findAll() {
		return (List<PhieuBanGiao>)phieuBanGiaoRepository.findAll();
	}
}
