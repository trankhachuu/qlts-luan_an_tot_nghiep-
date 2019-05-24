package tpm.qlts.repositorys;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.LoaiTB;

@Repository("loaiTBRepositoryByManhGa")
public interface LoaiTBRepositoryByManhGa extends LoaiTBRepository {
//	@Query(value = "select * from LoaiTB where MaLoai = (select MaLoaiCha from LoaiTB where MaLoai= :MaLoai)", nativeQuery = true)
//	public LoaiTB getLoaiChaFromMaLoaiCon(@Param("MaLoai") String maLoai);
//	
	@Query("select c from LoaiTB c where c.maLoai = (select lc from LoaiTB lc where lc.maLoai = :MaLoai)")
	public LoaiTB getLoaiChaFromMaLoaiCon(@Param("MaLoai") String maLoai);
}
