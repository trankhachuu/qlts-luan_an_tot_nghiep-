package tpm.qlts.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import tpm.qlts.entitys.Users;
import tpm.qlts.services.PermissionService;
import tpm.qlts.services.UserRevice;

@Controller
@RestController
@RequestMapping("account")
public class AccountController {
	@Autowired
	private UserRevice userService;

	@Autowired
	PermissionService perService;

	@PostMapping("check")
	public boolean checkLogin() {
		return true;
	}

	@GetMapping("get-all-user")
	public List<Users> getAllUser() {
		List<Users> resLst = userService.findAll();
		for (Users u : resLst) {
			u.setPassword("encode with bcrypt.");
		}
		return resLst;
	}

	@PostMapping("add-new-user")
	public Users addNewUser(@RequestBody Users user) {
		if (userService.existsById(user.getUserID()) == false) {
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String encodePassword = (user.getPassword() != null) ? passwordEncoder.encode(user.getPassword())
					: passwordEncoder.encode(user.getUsername());
			Users res = userService
					.update(new Users(user.getUserID(), user.getFullName(), encodePassword, user.getUsername(), true));
			res.setPassword("encode with bcrypt.");
			return res;
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OBJECT_EXISTS");
		}
	}

	@PutMapping("update-user")
	public Users updateUser(@RequestBody Users user) {
		if (userService.existsById(user.getUserID()) == true) {
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String oldPassword = userService.getPasswordByID(user.getUserID());
			String encodePassword = (user.getPassword() != null) ? passwordEncoder.encode(user.getPassword())
					: oldPassword;
			Users res = userService
					.update(new Users(user.getUserID(), user.getFullName(), encodePassword, user.getUsername(), true));
			res.setPassword("encode with bcrypt.");
			return res;
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID_NOT_EXISTS");
		}
	}

	@DeleteMapping("delete-user/{id}")
	public void deleteUser(@PathVariable String id) {
		if (userService.existsById(id) == true) {
			userService.deleteById(id);
			throw new ResponseStatusException(HttpStatus.OK, "DELETE_SUCCESSS");
		}
	}

	@DeleteMapping("delete-by-list")
	public int deleteByList(@RequestBody List<String> lstID) {
		int count = 0;
		for (String id : lstID) {
			if (userService.existsById(id) == true) {
				userService.deleteById(id);
				count++;
			}
		}
		return count;
	}

	@GetMapping("get-info-user")
	public Users getInfoUser(Principal principal) {
		try {
			Users uRes = userService.findByUserName(principal.getName());
			uRes.setPassword("password is not response...");
			return uRes;
		} catch (ResponseStatusException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "NOT_ACCESS_USER");
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "NOT_COMFIRM_ERROR");
		}

//		if(perService.checkPermission(uRes.getUserID(), 8)) {
//			//cos quyen
//		} 
//		else 
//		{
//			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "NOT_ACCESS");
//		}
	}

	@GetMapping("get-info-user-by-id/{id}")
	public Users getInfoUser(@PathVariable String id) {
		try {
			Optional<Users> uRes = userService.findById(id);
			Users user = null;
			if (uRes.isPresent()) {
				user = uRes.get();
			}

			user.setPassword("password is not response...");
			return user;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "ID_NOT_EXISTS");
		}
	}

//	public OutputAccount getInfoUser() {
//		
//	}
}
