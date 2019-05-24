package tpm.qlts.custommodels;

import java.util.List;

import tpm.qlts.entitys.Permission;

public class OutputAccount {
	private String userID;

	private String fullName;

	private String username;
	
	private List<Permission> permissions;

	public OutputAccount(String userID, String fullName, String username, List<Permission> permissions) {
		super();
		this.userID = userID;
		this.fullName = fullName;
		this.username = username;
		this.permissions = permissions;
	}

	public OutputAccount() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}
}
