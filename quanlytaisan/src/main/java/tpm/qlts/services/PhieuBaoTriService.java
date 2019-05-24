package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.PhieuBaoTri;
import tpm.qlts.repositorys.PhieuBaoTriRepository;

@Service("phieuBaoTriService")
public class PhieuBaoTriService {

	@Autowired
	PhieuBaoTriRepository phieuBaoTriRes;

	public List<PhieuBaoTri> saveAll(Iterable<PhieuBaoTri> entities) {
		return (List<PhieuBaoTri>) phieuBaoTriRes.saveAll(entities);
	}

	public PhieuBaoTri save(PhieuBaoTri phieu) {
		return phieuBaoTriRes.save(phieu);
	}

	public void delete(int id) {
		phieuBaoTriRes.deleteById(id);
	}

	public Iterable<PhieuBaoTri> findAll() {
		return phieuBaoTriRes.findAll();
	}

	public PhieuBaoTri findByID(int id) {
		Optional<PhieuBaoTri> s = phieuBaoTriRes.findById(id);
		if (s.isPresent()) {
			return s.get();
		}
		return null;
	}
}
