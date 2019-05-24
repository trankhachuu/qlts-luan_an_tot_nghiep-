package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.Function;
import tpm.qlts.repositorys.FunctionRepository;

@Service("functionService")
public class FunctionService {
	@Autowired
	private FunctionRepository functionRepository;

	public void deleteById(int id) {
		functionRepository.deleteById(id);
	}

	public Function update(Function function) {
		return functionRepository.save(function);
	}

	public Optional<Function> findById(int id) {
		return functionRepository.findById(id);
	}

	public List<Function> findAll() {
		return (List<Function>) functionRepository.findAll();
	}

	public boolean existsById(int id) {
		return functionRepository.existsById(id);
	}

	public List<Function> getFunctionByModuleID(int id) {
		return functionRepository.getFunctionByModuleID(id);
	}
}
