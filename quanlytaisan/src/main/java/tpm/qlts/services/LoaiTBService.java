package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.LoaiTB;
import tpm.qlts.repositorys.LoaiTBRepository;
import tpm.qlts.repositorys.LoaiThietBiRepository;

@Service("loaiTBService")
public class LoaiTBService {
	@Autowired
	LoaiTBRepository loaiTBRepository;

	@Autowired
	private LoaiThietBiRepository loaiThietBiRepository;

	public LoaiTB save(LoaiTB loaiTB) {
		return loaiTBRepository.save(loaiTB);
	}

	public List<LoaiTB> getLoaiTBSub() {
		return loaiTBRepository.getLoaiTBSub();
	}

	public List<LoaiTB> getLoaiTBCha() {
		return loaiTBRepository.getLoaiTBCha();
	}

	public LoaiTB findByID(String id) {
		Optional<LoaiTB> x = loaiTBRepository.findById(id);
		if (x.isPresent()) {
			return x.get();
		}
		return null;
	}

	public List<LoaiTB> findAll() {
		return (List<LoaiTB>) loaiTBRepository.findAll();
	}

	public List<LoaiTB> getAllByIdPhongBan(String id) {
		return loaiTBRepository.getAllByIdPhongBan(id);
	}

	public List<LoaiTB> getAllThietBimaLoai(String maPhongBan, String maLoai) {
		return loaiTBRepository.getAllThietBimaLoai(maPhongBan, maLoai);
	}

	public List<LoaiTB> getloaicha() {
		return (List<LoaiTB>) loaiThietBiRepository.getLoaitbcha();
	}

	public LoaiTB update(LoaiTB ltt) {
		return loaiThietBiRepository.save(ltt);
	}

	public boolean exitbyId(String id) {
		return loaiThietBiRepository.existsById(id);
	}

	public List<LoaiTB> gettenloaibyloaicha(String id) {
		return loaiThietBiRepository.gettbbymaloai(id);
	}

	public void deletebyId(String id) {
		loaiThietBiRepository.deleteById(id);
	}

	public List<LoaiTB> getAllLoaiTBByNhaCungCap(String maNCC) {
		return loaiTBRepository.getAllLoaiTBByNhaCungCap(maNCC);
	}

	public List<LoaiTB> getLoaiConByLoaiCha(String maLoaiCha) {
		return loaiTBRepository.getLoaiConByLoaiCha(maLoaiCha);
	}
}
