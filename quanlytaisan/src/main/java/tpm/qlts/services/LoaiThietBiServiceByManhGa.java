package tpm.qlts.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.LoaiTB;
import tpm.qlts.repositorys.LoaiTBRepositoryByManhGa;

@Service("loaiThietBiServiceByManhGa")
public class LoaiThietBiServiceByManhGa extends LoaiTBService {
	@Autowired
	LoaiTBRepositoryByManhGa loaiThietBiService;

	public LoaiTB getLoaiThietBiFromThietBiCon(String maLoai) {
		return loaiThietBiService.getLoaiChaFromMaLoaiCon(maLoai);
	}

	public LoaiTB findByID(String id) {
		Optional<LoaiTB> s = loaiThietBiService.findById(id);
		if (s.isPresent()) {
			return s.get();
		}
		return null;
	}
}
