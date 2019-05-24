package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.DonViTinh;
import tpm.qlts.repositorys.DonViTInhRepository;

@Service("donViTinhService")
public class DonViTinhService {
	@Autowired
	private DonViTInhRepository donViTInhRepository;

	public void deleteById(Integer id) {
		donViTInhRepository.deleteById(id);
	}

	public List<DonViTinh> findAll() {
		return (List<DonViTinh>) donViTInhRepository.findAll();
	}

	public DonViTinh findById(Integer id) {
		Optional<DonViTinh> x = donViTInhRepository.findById(id);
		if (x.isPresent()) {
			return x.get();
		}
		return null;
	}

	public DonViTinh save(DonViTinh donViTinh) {
		return donViTInhRepository.save(donViTinh);
	}

	public boolean existsById(Integer id) {
		return donViTInhRepository.existsById(id);
	}
}
