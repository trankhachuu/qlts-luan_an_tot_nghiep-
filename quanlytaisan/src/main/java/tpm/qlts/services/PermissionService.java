package tpm.qlts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tpm.qlts.entitys.Permission;
import tpm.qlts.entitys.PermissionPK;
import tpm.qlts.repositorys.PermissionRepository;

@Service("permissionService")
public class PermissionService {
	@Autowired
	private PermissionRepository permissionRepository;

	public void deleteById(PermissionPK id) {
		permissionRepository.deleteById(id);
	}

	public Permission update(Permission permission) {
		return permissionRepository.save(permission);
	}

	public Optional<Permission> findById(PermissionPK id) {
		return permissionRepository.findById(id);
	}

	public List<Permission> findAll() {
		return (List<Permission>) permissionRepository.findAll();
	}

	public void deleteAll(Iterable<Permission> entities) {
		permissionRepository.deleteAll(entities);
	}

	public Iterable<Permission> updateAll(Iterable<Permission> entities) {
		return permissionRepository.saveAll(entities);
	}

	public int[] getAllFunctionByUser(String idUser) {
		return permissionRepository.getAllFunctionByUserID(idUser);
	}

	public int[] getAllFunctionEnableByUserID(String idUser) {
		return permissionRepository.getAllFunctionEnableByUserID(idUser);
	}

	public List<Permission> getAllFunctionByUserIDFull(String idUser, int moduleID) {
		return permissionRepository.getAllFunctionByUserIDFull(idUser, moduleID);
	}

	public boolean checkPermission(String userID, int functionID) {
		return permissionRepository.checkPerission(userID, functionID) >= 1;
	}
	
	public List<Permission> selectAllPermissionByUserID(String userID) {
		return permissionRepository.selectAllPermissionByUserID(userID);
	}

}
