package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import tpm.qlts.entitys.TinhTrangRefThietBi;
import tpm.qlts.entitys.TinhTrangRefThietBiPK;

public interface TinhTrangRefThietBiRepository extends CrudRepository<TinhTrangRefThietBi, TinhTrangRefThietBiPK> {

	@Query(value = "select TOP 1 TT_TB.* from TT_TB where DenNgay is null and MaThietBi = :MaThietBi order by TuNgay desc", nativeQuery = true)
	public TinhTrangRefThietBi getLastAddTTTB(@Param("MaThietBi") long maThietBi);

	@Query(value = "select dbo.checkTonTaiMaTinhTrang(:MaTB, :MaTT) as checkTT", nativeQuery = true)
	public boolean checkTinhTrangTB(@Param("MaTB") long maThietBi, @Param("MaTT") String maTT);

	@Query(value = "select * from TT_TB where MaPhieuBaoTri = :MaPhieu", nativeQuery = true)
	public List<TinhTrangRefThietBi> getByMaPhieuBaoTri(@Param("MaPhieu") int maPhieu);
	
	@Query(value = "select * from TT_TB where MaThietBi = :MaThietBi", nativeQuery = true)
	public List<TinhTrangRefThietBi> getListTinhTrangThietBi(@Param("MaThietBi") long maThietBi);
}
