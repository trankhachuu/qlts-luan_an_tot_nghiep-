package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.NhanVienRefThietBi;
import tpm.qlts.entitys.NhanVienRefThietBiPK;

@Repository("nhanVienRefThietBiRepository")
public interface NhanVienRefThietBiRepository extends CrudRepository<NhanVienRefThietBi, NhanVienRefThietBiPK> {

	@Query(value = "select TOP 1 NV_TB.* FROM NV_TB where MaThietBi = :maThietBi and DenNgay is null order by MaBanGiao desc", nativeQuery = true)
	public NhanVienRefThietBi getAllMathietbi(@Param("maThietBi") long maThietBi);

	@Query("select m from PhongBan p join p.nhanViens n Join n.nvTbs m Join m.thietBi tb Join tb.loaiTb l where p.maPhongBan =:maPhongBan and m.denNgay IS NULL")
	public List<NhanVienRefThietBi> getAllNVTBByIdPhongBan(@Param("maPhongBan") String maPhongBan);

	@Query(value = "select * from NV_TB where MaThietBi = :MaThietBi", nativeQuery = true)
	public List<NhanVienRefThietBi> getListNhanVienThietBi(@Param("MaThietBi") long maThietBi);
}
