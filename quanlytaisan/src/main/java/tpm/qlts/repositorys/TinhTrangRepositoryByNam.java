package tpm.qlts.repositorys;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("tinhTrangRepositoryByNam")
public interface TinhTrangRepositoryByNam extends TinhTrangRepository{
	@Query(value = "select dbo.checkMaTinhTrang(:idThietBi) as TinhTrang", nativeQuery = true)
	public String getMaTinhTrangByIDThietBi(@Param("idThietBi") long idThietBi);
}
