package tpm.qlts.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tpm.qlts.custommodels.*;

import tpm.qlts.entitys.Function;
import tpm.qlts.entitys.Group;
import tpm.qlts.entitys.GroupRefFunction;
import tpm.qlts.entitys.GroupRefFunctionPK;
import tpm.qlts.entitys.Module;
import tpm.qlts.entitys.Permission;
import tpm.qlts.entitys.PermissionPK;
import tpm.qlts.entitys.UserRefGroup;
import tpm.qlts.entitys.UserRefGroupPK;
import tpm.qlts.entitys.Users;
import tpm.qlts.repositorys.GroupRefFunctionRepository;
import tpm.qlts.services.FunctionService;
import tpm.qlts.services.GroupRefFunctionService;
import tpm.qlts.services.GroupService;
import tpm.qlts.services.ModuleService;
import tpm.qlts.services.PermissionService;
import tpm.qlts.services.UserRefGroupService;
import tpm.qlts.services.UserRevice;

@Controller
@RestController
@RequestMapping("permission")
public class PermissionController {
	@Autowired
	private GroupService groupService;
	@Autowired
	private ModuleService moduleService;
	@Autowired
	private FunctionService functionService;
	@Autowired
	private UserRefGroupService userRefGroupService;
	@Autowired
	private GroupRefFunctionService groupRefFunctionService;
	@Autowired
	private PermissionService permissionService;
	@Autowired
	private UserRevice userService;
	@Autowired
	private GroupRefFunctionRepository groupRefFunctionRepository;

	@GetMapping("index")
	private String index() {
		return "Permission API by Cuong, Phuong Van.";
	}

	// Crud table group
	@GetMapping("get-all-group-and-check/{id}")
	public AllGroupAndCheck getAllGroupAndCheck(@PathVariable String id) {
		List<Integer> checked = userRefGroupService.getAllGroupByUserID(id);
		return new AllGroupAndCheck(groupService.findAll(), checked);
	}

	// Crud table group
	@GetMapping("get-all-group")
	public List<Group> getAllGroup() {
		return groupService.findAll();
	}

	@PostMapping("add-group")
	public Group addNewGroup(@RequestBody Group group) {
		// check permission
		return groupService.update(group);
	}

	@PutMapping("update-group")
	public Group updateGroup(@RequestBody Group group) {
		// check permission
		if (groupService.existsById(group.getGroupID()))
			return groupService.update(group);
		else
			return null;
	}

	@DeleteMapping("delete-group/{id}")
	public void deleteGroup(@PathVariable int id) {
		if (groupService.existsById(id))
			groupService.deleteById(id);
	}

	@GetMapping("get-all-function-by-groupid/{id}")
	public List<Function> getAllFunctionByGroupID(@PathVariable int id) {
		return groupRefFunctionRepository.getFunctionByGroupKey(id);
	}

	// Crud table module

	@GetMapping("get-all-module")
	public List<Module> getAllModule() {
		return moduleService.findAll();
	}

	@PostMapping("add-module")
	public Module addNewModule(@RequestBody Module module) {
		// check permission
		return moduleService.update(module);
	}

	@PutMapping("update-module")
	public Module updateModule(@RequestBody Module module) {
		// check permission
		if (moduleService.existsById(module.getModuleID()))
			return moduleService.update(module);
		else
			return null;
	}

	@DeleteMapping("delete-module/{id}")
	public void deleteModule(@PathVariable int id) {
		if (moduleService.existsById(id))
			moduleService.deleteById(id);
	}

	// Crud table function
	@GetMapping("get-function-by-moduleid/{id}")
	public List<Function> getAllFunctionByModuleID(@PathVariable("id") int id) {
		return functionService.getFunctionByModuleID(id);
	}

	@GetMapping("get-function-groupby-moduleid")
	public List<AllFunctionGroupByModule> getAllFunctionGroupByModule() {
		List<Module> lst = moduleService.findAll();
		List<AllFunctionGroupByModule> lstRes = new ArrayList<AllFunctionGroupByModule>();
		for (Module item : lst) {
			if (item.getFunctions().size() < 1)
				continue;
			lstRes.add(new AllFunctionGroupByModule(item.getModuleID(), item.getModuleName(), item.getFunctions()));
		}
		return lstRes;
	}

	@PostMapping("add-function")
	public Function addNewFunction(@RequestBody Function function) {
		// check permission
		function.setModule(new Module(function.getModuleID()));
		return functionService.update(function);
	}

	@PutMapping("update-function")
	public Function updateModule(@RequestBody Function function) {
		// check permission
		function.setModule(new Module(function.getModuleID()));
		if (functionService.existsById(function.getFunctionID()))
			return functionService.update(function);
		else
			return null;
	}

	@DeleteMapping("delete-function/{id}")
	public void deleteFunction(@PathVariable int id) {
		if (functionService.existsById(id))
			functionService.deleteById(id);
	}

	@DeleteMapping("delete-function-by-list")
	public int deleteFunctionByList(@RequestBody List<Integer> lstID) {
		int count = 0;
		for (int id : lstID) {
			if (functionService.existsById(id) == true) {
				functionService.deleteById(id);
				count++;
			}
		}
		return count;
	}

	// Crud table UserGroup
	@PostMapping("add-usergroup")
	public UserRefGroup addNewUserGroup(@RequestBody UserRefGroup userRefGroup) {
		// check permission
		return userRefGroupService.update(userRefGroup);
	}

	// Crud table UserGroup
	@GetMapping("getall-user-group")
	public List<UserRefGroup> getAllUserGroup() {
		return userRefGroupService.findAll();
	}

	@Transactional
	@PostMapping("update-usergroup-by-list")
	public Iterable<UserRefGroup> updateUserGroup(@RequestBody List<UserRefGroupPK> lstUGPK) {
		// check permission
		List<UserRefGroup> lstInClient = this.toUserRefGroup(lstUGPK);
		List<UserRefGroup> lstInDatabase = userRefGroupService.findAll();
		List<UserRefGroup> lstDel = lstInDatabase;
		List<UserRefGroup> lstAdd = lstInClient;

//		for (UserRefGroup itemClient : lstInClient) {
//			UserRefGroupPK idClient = itemClient.getId();
//			for (UserRefGroup itemDatabase : lstInDatabase) {
//				if (idClient.getGroupID() == itemDatabase.getId().getGroupID()
//						&& idClient.getUserID().equals(itemDatabase.getId().getUserID()) == true) {
//					lstAdd.remove(itemClient);
//					lstDel.remove(itemDatabase);
//				}
//			}
//		}

		for (int i = 0; i < lstInClient.size(); i++) {
			UserRefGroupPK idClient = lstInClient.get(i).getId();
			for (int j = 0; j < lstInDatabase.size(); j++) {
				if (idClient.getGroupID() == lstInDatabase.get(j).getId().getGroupID()
						&& idClient.getUserID().equals(lstInDatabase.get(j).getId().getUserID()) == true) {
					lstAdd.remove(lstInDatabase.get(j));
					lstDel.remove(lstInClient.get(i));
					continue;
				}
				i++;
			}
		}
		userRefGroupService.deleteAll(lstDel);
		return userRefGroupService.updateByList(lstAdd);
	}

	public List<UserRefGroup> toUserRefGroup(List<UserRefGroupPK> lstUGPK) {
		List<UserRefGroup> lstRes = new ArrayList<UserRefGroup>();
		for (UserRefGroupPK k : lstUGPK) {
			lstRes.add(new UserRefGroup(new UserRefGroupPK(k.getUserID(), k.getGroupID())));
		}
		return lstRes;
	}

	// Crud table group-function
	@GetMapping("getall-group-function")
	public List<GroupRefFunction> getAllGroupFunction() {
		return groupRefFunctionService.findAll();
	}

	// Get all function selected by group id
	@GetMapping("getall-function-by-groupid/{id}")
	public List<String> getAllFunctionSelectByGroupID(@PathVariable int id) {
		List<Integer> lstGroupFunction = groupRefFunctionService.getFunctionByGroupID(id);
		List<String> lstID = new ArrayList<String>();
		for (int item : lstGroupFunction)
			lstID.add(String.valueOf(item));
		return lstID;
	}

//	@Transactional
//	@PostMapping("update-groupfunction-by-list")
//	public Iterable<GroupRefFunction> updateGroupFunction(@RequestBody List<GroupRefFunctionPK> lstKey) {
//		List<GroupRefFunction> lstInClient = this.toGroupFunction(lstKey);
//		List<GroupRefFunction> lstInDatabase = groupRefFunctionService.findAll();
//		List<GroupRefFunction> lstDel = lstInDatabase;
//		List<GroupRefFunction> lstAdd = lstInClient;
//
//		for (int i = 0; i < lstInClient.size(); i++) {
//			GroupRefFunctionPK idClient = lstInClient.get(i).getId();
//			for (int j = 0; j < lstInDatabase.size(); j++) {
//				if (idClient.getGroupID() == lstInDatabase.get(j).getId().getGroupID()
//						&& idClient.getFunctionID() == lstInDatabase.get(j).getId().getFunctionID()) {
//					lstAdd.remove(lstInDatabase.get(j));
//					lstDel.remove(lstInClient.get(i));
//					continue;
//				}
//				i++;
//			}
//		}
//		groupRefFunctionService.deleteByList(lstDel);
//		return groupRefFunctionService.saveAllByList(lstAdd);
//	}

//	public List<GroupRefFunction> toGroupFunction(List<GroupRefFunctionPK> lstKey) {
//		List<GroupRefFunction> lstRes = new ArrayList<GroupRefFunction>();
//		for (GroupRefFunctionPK k : lstKey) {
//			lstRes.add(new GroupRefFunction(new GroupRefFunctionPK(k.getGroupID(), k.getFunctionID())));
//		}
//		return lstRes;
//	}

	@Transactional
	@PostMapping("update-groupfunction-by-list2")
	public List<Function> updateFunctionInGroup(@RequestBody Group_ListFunctionUpdate data) {
		List<Integer> lstInClient = data.getLstFunction();
		List<Integer> lstDatabase = groupRefFunctionService.getFunctionByGroupID(data.getGroupID());

		for (int i = 0; i < lstInClient.size(); i++) {
			if (lstDatabase.contains(lstInClient.get(i)) == true) {
				lstDatabase.remove(lstInClient.get(i));
				lstInClient.remove(lstInClient.get(i));
				i++;
			}
		}

		List<GroupRefFunction> lstAdd = convertIntegerList_To_GroupRefFunctionList(lstInClient, data.getGroupID());
		List<GroupRefFunction> lstDelete = convertIntegerList_To_GroupRefFunctionList(lstDatabase, data.getGroupID());
		if (lstDelete.size() > 0)
			groupRefFunctionService.deleteByList(lstDelete);
		if (lstAdd.size() > 0)
			groupRefFunctionService.saveAllByList(lstAdd);
		return groupRefFunctionRepository.getFunctionByGroupKey(data.getGroupID());
	}

	public List<GroupRefFunction> convertIntegerList_To_GroupRefFunctionList(List<Integer> lst, int groupID) {
		List<GroupRefFunction> res = new ArrayList<GroupRefFunction>();
		for (int item : lst) {
			res.add(new GroupRefFunction(new GroupRefFunctionPK(groupID, item)));
		}
		return res;
	}

	@PostMapping("update-permission-user")
	public Iterable<Permission> setPermissionToUser(@RequestBody PermissionUserUpdate data) {
		List<Permission> lstPermissionClient = new ArrayList<Permission>();
		for (int i = 0; i < data.getLstFunction().length; i++) {
			lstPermissionClient.add(new Permission(new PermissionPK(data.getUserID(), data.getLstFunction()[i])));
		}

		//
		List<Permission> lstInDatabase = permissionService.findAll();
		for (int i = 0; i < lstPermissionClient.size(); i++) {
			PermissionPK idClient = lstPermissionClient.get(i).getId();
			for (int j = 0; j < lstInDatabase.size(); j++) {
				if (idClient.getFunctionID() == lstInDatabase.get(j).getId().getFunctionID()
						&& idClient.getUserID().equals(lstInDatabase.get(j).getId().getUserID())) {
					lstPermissionClient.remove(lstPermissionClient.get(j));
					lstInDatabase.remove(lstInDatabase.get(i));
					continue;
				}
				i++;
			}
		}

		if (lstInDatabase.size() > 0)
			permissionService.deleteAll(lstInDatabase);
		return permissionService.updateAll(lstPermissionClient);
	}

	//

	@GetMapping("get-permission-user/{id}")
	public List<PermissionItem> getPermissionOfUser(@PathVariable String id) {
		List<Function> allFunction = functionService.findAll();

		int[] functionByUser = permissionService.getAllFunctionByUser(id);

		List<PermissionItem> lstRes = new ArrayList<PermissionItem>();
		for (Function f : allFunction) {
			if (this.existsInList(f.getFunctionID(), functionByUser))
				lstRes.add(new PermissionItem(id, f.getFunctionID(), f.getFunctionName(), f.getModule().getModuleID(),
						f.getModule().getModuleName(), true));
			else
				lstRes.add(new PermissionItem(id, f.getFunctionID(), f.getFunctionName(), f.getModule().getModuleID(),
						f.getModule().getModuleName(), false));
		}

		return lstRes;
	}

	public boolean existsInList(int id, int[] lst) {
		for (int i = 0; i < lst.length; i++) {
			if (lst[i] == id)
				return true;
		}
		return false;
	}

	@GetMapping("get-function-active")
	public List<Permissions> getFunctionActiveByUser(Principal principal) {
		Users uRes = userService.findByUserName(principal.getName());
		List<Permissions> lstData = new ArrayList<Permissions>();
		List<Module> allModule = moduleService.findAll();
		for (Module itemModule : allModule) {
			List<Permission> lstPermission = permissionService.getAllFunctionByUserIDFull(uRes.getUserID(),
					itemModule.getModuleID());
			List<Function> tmpList = new ArrayList<Function>();
			for (Permission p : lstPermission) {
				Function f = p.getFunction();
				tmpList.add(f);
			}
			if(tmpList.size() > 0) {
				lstData.add(new Permissions(itemModule.getModuleID(), itemModule.getModuleName(), tmpList));
			}
			
		}
		return lstData;
	}

	@GetMapping("test-test")
	public List<Integer> updatePermissionByGroup() {
		List<Integer> groups = new ArrayList<Integer>();
		groups.add(1);
		return groupRefFunctionService.getAllFunctionByGroup(groups);
	}

	@Transactional
	@PutMapping("update-permission")
	public List<Permission> updateFunctionInGroup(@RequestBody PermisionUpdate data) {
		// get list function in database and post to client
		List<Integer> lstInClient = new ArrayList<Integer>();
		if (data.getGroupIDs().size() > 0) {
			lstInClient = groupRefFunctionService.getAllFunctionByGroup(data.getGroupIDs());
		}
		int[] lstID = permissionService.getAllFunctionByUser(data.getUserID());
		List<Integer> lstDatabase = new ArrayList<Integer>();
		for (int i : lstID) {
			lstDatabase.add(i);
		}

		// delete conflicted
		if (lstDatabase.size() > 0 && lstInClient.size() > 0) {
			for (int i = 0; i < lstInClient.size(); i++) {
				if (lstDatabase.contains(lstInClient.get(i)) == true) {
					lstDatabase.remove(lstInClient.get(i));
					lstInClient.remove(lstInClient.get(i));
					i++;
				}
			}
		}

		// convert to entity
		List<Permission> lstAdd = convertFunctionListToPermissionList(lstInClient, data.getUserID());
		List<Permission> lstDelete = convertFunctionListToPermissionList(lstDatabase, data.getUserID());

		// update to database
		if (lstDelete.size() > 0)
			permissionService.deleteAll(lstDelete);
		if (lstAdd.size() > 0)
			permissionService.updateAll(lstAdd);

		// update to user-group
		this.updateTableGroupUser(data.getUserID(), data.getGroupIDs());

		return permissionService.findAll();
	}

	public void updateTableGroupUser(String userID, List<Integer> groupsInClient) {
		List<Integer> groupsToDatabase = userRefGroupService.getAllGroupByUserID(userID);

		// delete conflicted
		if (groupsInClient.size() > 0 && groupsToDatabase.size() > 0) {
			for (int i = 0; i < groupsInClient.size(); i++) {
				if (groupsToDatabase.contains(groupsInClient.get(i)) == true) {
					groupsToDatabase.remove(groupsInClient.get(i));
					groupsInClient.remove(groupsInClient.get(i));
					i++;
				}
			}
		}
		List<UserRefGroup> lstAdd = convertGroupListToGroupRefUserList(groupsInClient, userID);
		List<UserRefGroup> lstDelete = convertGroupListToGroupRefUserList(groupsToDatabase, userID);

		// udpate to database
		if (lstDelete.size() > 0)
			userRefGroupService.deleteByList(lstDelete);
		if (lstAdd.size() > 0)
			userRefGroupService.updateByList(lstAdd);

	}

	public List<Permission> convertFunctionListToPermissionList(List<Integer> lst, String userID) {
		List<Permission> permissions = new ArrayList<Permission>();
		for (int i : lst) {
			PermissionPK permissionPK = new PermissionPK(userID, i);
			permissions.add(new Permission(permissionPK, userID, i, true));
		}
		return permissions;
	}

	public List<UserRefGroup> convertGroupListToGroupRefUserList(List<Integer> groups, String userID) {
		List<UserRefGroup> userRefGroups = new ArrayList<UserRefGroup>();
		for (int i : groups) {
			UserRefGroupPK userRefGroupPK = new UserRefGroupPK(userID, i);
			userRefGroups.add(new UserRefGroup(userRefGroupPK));
		}
		return userRefGroups;
	}

	@GetMapping("get-function-groupby-group/{userid}")
	public ListFunctionAndCheck getAllFunctionGroupByGroup(@PathVariable String userid) {
		List<AllFunctionGroupByGroup> lstRes = new ArrayList<AllFunctionGroupByGroup>();

		List<Group> lstGroups = userRefGroupService.getGroupEntityByUserID(userid);

		for (Group item : lstGroups) {
			List<Function> lstFunction = groupRefFunctionService.getAllFunctionByGroupID(item.getGroupID());
			AllFunctionGroupByGroup it = new AllFunctionGroupByGroup(item.getGroupID(), item.getGroupName(),
					lstFunction);
			lstRes.add(it);
		}

		int[] lstCheck = permissionService.getAllFunctionEnableByUserID(userid);

		return new ListFunctionAndCheck(lstRes, lstCheck);
	}

	@PutMapping("update-enable-permission/{userID}")
	public void updateEnablePermission(@RequestBody List<Integer> lstFunction, @PathVariable String userID) {
		List<Permission> permissionOfUser = permissionService.selectAllPermissionByUserID(userID);
		for (Permission item : permissionOfUser) {
			if (checkInList(lstFunction, item.getFunctionID()) == true) {
				item.setEnable(true);
			} else {
				item.setEnable(false);
			}
		}
		permissionService.updateAll(permissionOfUser);
	}

	public boolean checkInList(List<Integer> lst, int id) {
		for (Integer i : lst) {
			if (id == i)
				return true;
		}
		return false;
	}
}
