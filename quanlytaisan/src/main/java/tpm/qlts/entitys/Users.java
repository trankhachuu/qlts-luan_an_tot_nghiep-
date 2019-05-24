package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * The persistent class for the User database table.
 * 
 */
@Entity
@NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u")
public class Users implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "UserID")
	private String userID;

	@Column(name = "FullName")
	private String fullName;

	@Column(name = "Password")
	private String password;

	@Column(name = "Username")
	private String username;

	@Column(name = "enabled")
	private boolean enabled;

	// bi-directional many-to-one association to Permission
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Permission> permissions;

	// bi-directional many-to-one association to UserRefGroup
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<UserRefGroup> userGroups;

	public Users() {
	}

	public Users(String userID, String fullName, String password, String username, boolean enabled) {
		super();
		this.userID = userID;
		this.fullName = fullName;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
	}

	public Users(String fullName, String password, String username) {
		super();
		this.fullName = fullName;
		this.password = password;
		this.username = username;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getUserID() {
		return this.userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getFullName() {
		return this.fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<Permission> getPermissions() {
		return this.permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public Permission addPermission(Permission permission) {
		getPermissions().add(permission);
		permission.setUser(this);

		return permission;
	}

	public Permission removePermission(Permission permission) {
		getPermissions().remove(permission);
		permission.setUser(null);

		return permission;
	}

	public List<UserRefGroup> getUserGroups() {
		return this.userGroups;
	}

	public void setUserGroups(List<UserRefGroup> userGroups) {
		this.userGroups = userGroups;
	}

	public UserRefGroup addUserGroup(UserRefGroup userGroup) {
		getUserGroups().add(userGroup);
		userGroup.setUser(this);

		return userGroup;
	}

	public UserRefGroup removeUserGroup(UserRefGroup userGroup) {
		getUserGroups().remove(userGroup);
		userGroup.setUser(null);

		return userGroup;
	}

}