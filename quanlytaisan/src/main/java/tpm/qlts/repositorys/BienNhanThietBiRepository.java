package tpm.qlts.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.BienNhanThietBi;

@Repository("bienNhanThietBiRepository")
public interface BienNhanThietBiRepository extends JpaRepository<BienNhanThietBi, String> {
	
	

}
