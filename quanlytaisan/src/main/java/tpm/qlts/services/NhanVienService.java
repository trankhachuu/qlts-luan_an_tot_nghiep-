package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.NhanVien;
import tpm.qlts.repositorys.NhanVienRepository;

@Service("nhanVienService")
public class NhanVienService {

	@Autowired
	private NhanVienRepository nhanVienRepository;

	public void deleteById(String id) {
		nhanVienRepository.deleteById(id);
	}

	public NhanVien save(NhanVien nhanVien) {
		return nhanVienRepository.save(nhanVien);
	}

	public NhanVien findById(String id) {
		Optional<NhanVien> x = nhanVienRepository.findById(id);
		if (x.isPresent())
			return x.get();

		return null;
	}

	public List<NhanVien> findAll() {
		return (List<NhanVien>) nhanVienRepository.findAllTrue();
	}

	public boolean existsById(String id) {
		return nhanVienRepository.existsById(id);
	}

	public List<NhanVien> findNhanVienByName(String ten) {
		return nhanVienRepository.findNhanVienByName(ten);
	}

	public List<NhanVien> getNhanVienRefPhongBan(String maPhongBan) {
		return nhanVienRepository.getNhanVienRefPhongBan(maPhongBan);
	}
	
	public NhanVien getNhanVienByMaThietBi(long maThietBi) {
		return nhanVienRepository.getNhanVienByMaThietBi(maThietBi);
	}
	
	public int getTongNhanVien() {
		return nhanVienRepository.getTongNhanVien();
	}
	
	public String getNhanVienByID(String maNhanVien) {
		return nhanVienRepository.getNhanVienByID(maNhanVien);
	}
}
