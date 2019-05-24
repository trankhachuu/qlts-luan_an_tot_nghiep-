package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.Group;
import tpm.qlts.entitys.UserRefGroup;
import tpm.qlts.entitys.UserRefGroupPK;
import tpm.qlts.repositorys.UserRefGroupRepository;

@Service("userRefGroupService")
public class UserRefGroupService {
	@Autowired
	private UserRefGroupRepository userRefGroupRepository;

	public void deleteById(UserRefGroupPK id) {
		userRefGroupRepository.deleteById(id);
	}

	public UserRefGroup update(UserRefGroup userRefGroup) {
		return userRefGroupRepository.save(userRefGroup);
	}

	public Iterable<UserRefGroup> updateByList(Iterable<UserRefGroup> userRefGroups) {
		return userRefGroupRepository.saveAll(userRefGroups);
	}

	public void deleteByList(Iterable<UserRefGroup> userRefGroups) {
		userRefGroupRepository.deleteAll(userRefGroups);
	}

	public List<UserRefGroup> findAll() {
		return (List<UserRefGroup>) userRefGroupRepository.findAll();
	}

	public Optional<UserRefGroup> findById(UserRefGroupPK id) {
		return userRefGroupRepository.findById(id);
	}

	public boolean as(UserRefGroupPK id) {
		return userRefGroupRepository.existsById(id);
	}

	public void deleteAll(Iterable<UserRefGroup> entities) {
		userRefGroupRepository.deleteAll(entities);
	}

	public List<Integer> getAllGroupByUserID(String userID) {
		return userRefGroupRepository.getAllGroupByUserID(userID);
	}

	public List<Group> getGroupEntityByUserID(String userID) {
		return userRefGroupRepository.getGroupEntityByUserID(userID);
	}
}
