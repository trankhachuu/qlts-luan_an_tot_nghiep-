package tpm.qlts.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.ChiTiet;

@Repository("chiTietRepository")
public interface ChiTietRepository extends JpaRepository<ChiTiet, Integer> {

	@Query(value = "select * from ChiTiet inner join BienNhanThietBi on (ChiTiet.MaBienNhan = BienNhanThietBi.MaBienNhan) where BienNhanThietBi.MaBienNhan = :MaBienNhan", nativeQuery = true)
	public List<ChiTiet> getChiTietBienNhanByBienNhan(@Param("MaBienNhan") String maBienNhan);
}
