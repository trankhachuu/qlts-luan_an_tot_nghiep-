package tpm.qlts.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.TinhTrangRefThietBi;
import tpm.qlts.repositorys.TinhTrangRefThietBiRepository;

@Service("tinhTrangRefThietBiService")
public class TinhTrangRefThietBiService {
	@Autowired
	TinhTrangRefThietBiRepository ttRefTbRes;
	
	public TinhTrangRefThietBi getLastAddTTTB(long maThietBi) {
		return ttRefTbRes.getLastAddTTTB(maThietBi);
	}
	
	public List<TinhTrangRefThietBi> saveAll(List<TinhTrangRefThietBi> entities) {
		return (List<TinhTrangRefThietBi>)ttRefTbRes.saveAll(entities);
	}
	
	public void deleteAll(Iterable<TinhTrangRefThietBi> entities) {
		 ttRefTbRes.deleteAll(entities);
	}
	
	public boolean checkTinhTrangTB(long maThietBi, String maTT) {
		return ttRefTbRes.checkTinhTrangTB(maThietBi, maTT);
	}
	
	public List<TinhTrangRefThietBi> getByMaPhieuBaoTri(int maPhieu){
		return ttRefTbRes.getByMaPhieuBaoTri(maPhieu);
	}
	
	public List<TinhTrangRefThietBi> getListTinhTrangThietBi(long maThietBi){
		return ttRefTbRes.getListTinhTrangThietBi(maThietBi);
	}

}
