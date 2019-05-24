package tpm.qlts.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.PhieuThanhLy;
import tpm.qlts.repositorys.PhieuThanhLyRepository;

@Service("PhieuThanhLyServices")
public class PhieuThanhLyServices {
		@Autowired
		private PhieuThanhLyRepository phieuThanhLyRepository;
		
		public PhieuThanhLy update(PhieuThanhLy tl)
		{
			return phieuThanhLyRepository.save(tl);
		}
		
		public void delete(String id)
		{
			phieuThanhLyRepository.deleteById(id);
		}
		
		public Iterable<PhieuThanhLy> findAll()
		{
			return phieuThanhLyRepository.findAll();
		}
		
		public Optional<PhieuThanhLy> findById(String id)
		{
			return phieuThanhLyRepository.findById(id);
		}
		
}
