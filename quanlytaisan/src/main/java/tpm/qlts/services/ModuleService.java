package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.Module;
import tpm.qlts.repositorys.ModuleRepository;

@Service("moduleRevice")
public class ModuleService {
	@Autowired
	private ModuleRepository moduleRepository;

	public void deleteById(int id) {
		moduleRepository.deleteById(id);
	}

	public Optional<Module> findById(int id) {
		return moduleRepository.findById(id);
	}

	public Module update(Module module) {
		return moduleRepository.save(module);
	}

	public List<Module> findAll() {
		return (List<Module>) moduleRepository.findAll();
	}

	public boolean existsById(int id) {
		return moduleRepository.existsById(id);
	}
}
