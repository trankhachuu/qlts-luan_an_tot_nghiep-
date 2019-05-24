package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.PhongBan;
import tpm.qlts.repositorys.PhongBanRepository;

@Service("phongBanService")
public class PhongBanService {
	@Autowired
	private PhongBanRepository phongBanRepository;

	public void deleteById(String id) {
		phongBanRepository.deleteById(id);
	}

	public PhongBan update(PhongBan phongBan) {
		return phongBanRepository.save(phongBan);
	}

	public Optional<PhongBan> findById(String id) {
		return phongBanRepository.findById(id);
	}

	public List<PhongBan> findAll() {
		return (List<PhongBan>) phongBanRepository.findAll();
	}

	public boolean existsById(String id) {
		return phongBanRepository.existsById(id);
	}

	public PhongBan getByIdThietBi(long id) {
		try {
			return phongBanRepository.getByIdThietBi(id);
		} catch (Exception x) {
			return null;
		}
	}
	
	public PhongBan getPhongBanByNhanVienID(String maNhanVien) {
		return phongBanRepository.getPhongBanByNhanVienID(maNhanVien);
	}
	
	public PhongBan getPhongBanByThietBiID(long maThietBi) {
		return phongBanRepository.getPhongBanByThietBiID(maThietBi);
	}
	
	public PhongBan getPhongBanByMaThietBi(long maThietBi) {
		return phongBanRepository.getPhongBanByMaThietBi(maThietBi);
	}
	
	public int getTongPhongBan() {
		return phongBanRepository.getTongPhongBan();
	}
}
