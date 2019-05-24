package tpm.qlts.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.ThietBi;
import tpm.qlts.repositorys.ThietBiRepositoryByManhGa;

@Service("thietBiServiceByManhGa")
public class ThietBiServiceByManhGa extends ThietBiServices {
	@Autowired
	ThietBiRepositoryByManhGa thietBiRepositoryByManhGa;

	public List<ThietBi> getThietBiByNhaCungCap(String maNCC) {
		return thietBiRepositoryByManhGa.getThietBiByNhaCungCap(maNCC);
	}
	
	public List<ThietBi> getThietBiByNCCAndMaLoai(String maNCC, String maLoai) {
		return thietBiRepositoryByManhGa.getThietBiByNCCAndMaLoai(maNCC, maLoai);
	}
	
	
	
	
}
