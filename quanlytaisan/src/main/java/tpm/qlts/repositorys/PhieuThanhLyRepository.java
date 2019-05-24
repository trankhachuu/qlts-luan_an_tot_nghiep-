package tpm.qlts.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.PhieuThanhLy;

@Repository("phieuThanhLyRepository")
public interface PhieuThanhLyRepository extends JpaRepository<PhieuThanhLy, String>{

}
