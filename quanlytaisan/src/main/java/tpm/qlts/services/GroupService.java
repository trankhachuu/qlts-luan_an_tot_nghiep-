package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.Group;
import tpm.qlts.repositorys.GroupRepository;

@Service("groupService")
public class GroupService {
	@Autowired
	private GroupRepository groupRepository;

	public void deleteById(int id) {
		groupRepository.deleteById(id);
	}

	public Group update(Group group) {
		return groupRepository.save(group);
	}

	public Optional<Group> findById(int id) {
		return groupRepository.findById(id);
	}

	public List<Group> findAll() {
		return (List<Group>) groupRepository.findAll();
	}

	public boolean existsById(int id) {
		return groupRepository.existsById(id);
	}
}
