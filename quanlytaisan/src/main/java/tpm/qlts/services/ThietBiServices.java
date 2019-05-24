package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.ThietBi;
import tpm.qlts.repositorys.ThietBiRepository;

@Service("ThietBiServices")
@Primary
public class ThietBiServices {
	@Autowired
	private ThietBiRepository thietBiRepository;

	public ThietBi update(ThietBi tb) {
		return thietBiRepository.save(tb);
	}

	public void delete(Long id) {
		thietBiRepository.deleteById(id);
	}

	public List<ThietBi> findAll() {
		return (List<ThietBi>) thietBiRepository.findAll();
	}

	public ThietBi findById(Long id) {
		Optional<ThietBi> s = thietBiRepository.findById(id);
		if (s.isPresent()) {
			return s.get();
		}
		return null;
	}

	public long getMaxIDThietBi() {
		try {
			long recive = thietBiRepository.getMaxIDThietBi();
			return recive + 1;
		} catch (Exception e) {
			return 1;
		}

	}

	public List<ThietBi> update(Iterable<ThietBi> tbs) {
		return thietBiRepository.saveAll(tbs);
	}

	public boolean checkExisted(long id) {
		return thietBiRepository.existsById(id);
	}

	//

	public List<ThietBi> getAllThietBiByID(String maPhongBan, String maLoai) {
		return thietBiRepository.getAllThietBiByID(maPhongBan, maLoai);
	}

	public List<ThietBi> getAllByIdthietBiPhongBan(String id) {
		return thietBiRepository.getAllByIdthietBiPhongBan(id);
	}

	public List<ThietBi> getThietBiIdPhongBan(String id) {
		return thietBiRepository.getThietBiIdPhongBan(id);
	}

	public List<ThietBi> getThietBiIdPhongBanIdLoai(String maPhongBan, String maLoai) {
		return thietBiRepository.getThietBiIdPhongBanIdLoai(maPhongBan, maLoai);
	}

	public String getTenThietBi(long maThietBi) {
		return thietBiRepository.getTenThietBi(maThietBi);
	}

	public long[] getListMaThietBiOfNhanVien(String maNhanVien) {
		return thietBiRepository.getListMaThietBiOfNhanVien(maNhanVien);
	}

	public List<ThietBi> getAllThietBiByPhieuBanGiao(int maBanGiao) {
		return thietBiRepository.getAllThietBiByPhieuBanGiao(maBanGiao);
	}

	public int getMaxThietBi() {
		return thietBiRepository.getMaxThietBi();
	}

	public List<ThietBi> getAllThietBiByTinhTrang() {
		return thietBiRepository.getAllThietBiByTinhTrang();
	}

	public List<ThietBi> getAllThietBiByPhieuThanhLy() {
		return thietBiRepository.getAllThietBiByPhieuThanhLy();
	}

	public List<ThietBi> getThietBiByNhanVien(String maNhanVien) {
		return thietBiRepository.getThietBiByNhanVien(maNhanVien);
	}

	public List<ThietBi> saveAll(List<ThietBi> lstThietBi) {
		return thietBiRepository.saveAll(lstThietBi);
	}
}
