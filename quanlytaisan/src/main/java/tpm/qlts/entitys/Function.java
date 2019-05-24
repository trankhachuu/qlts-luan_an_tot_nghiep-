package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * The persistent class for the Function database table.
 * 
 */
@Entity
@Table(name = "Functions")
@NamedQuery(name = "Function.findAll", query = "SELECT f FROM Function f")
public class Function implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FunctionID")
	private int functionID;

	@Column(name = "FunctionName")
	private String functionName;

	@Column(name = "Url")
	private String url;

	@Column(name = "IconType")
	private String iconType;

	@Column(name = "ModuleID", updatable = false, insertable = false)
	private int moduleID;

	@Column(name = "Enable")
	private boolean enable;

	public int getModuleID() {
		return moduleID;
	}

	public void setModuleID(int moduleID) {
		this.moduleID = moduleID;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	// bi-directional many-to-one association to Module
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ModuleID")
	@JsonIgnore
	private Module module;

	// bi-directional many-to-one association to GroupRefFunction
	@OneToMany(mappedBy = "function")
	@JsonIgnore
	private List<GroupRefFunction> groupFunctions;

	// bi-directional many-to-one association to Permission
	@OneToMany(mappedBy = "function")
	@JsonIgnore
	private List<Permission> permissions;

	public Function() {
	}

	public int getFunctionID() {
		return this.functionID;
	}

	public void setFunctionID(int functionID) {
		this.functionID = functionID;
	}

	public String getFunctionName() {
		return this.functionName;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Module getModule() {
		return this.module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public List<GroupRefFunction> getGroupFunctions() {
		return this.groupFunctions;
	}

	public void setGroupFunctions(List<GroupRefFunction> groupFunctions) {
		this.groupFunctions = groupFunctions;
	}

	public GroupRefFunction addGroupFunction(GroupRefFunction groupFunction) {
		getGroupFunctions().add(groupFunction);
		groupFunction.setFunction(this);

		return groupFunction;
	}

	public GroupRefFunction removeGroupFunction(GroupRefFunction groupFunction) {
		getGroupFunctions().remove(groupFunction);
		groupFunction.setFunction(null);

		return groupFunction;
	}

	public List<Permission> getPermissions() {
		return this.permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public Permission addPermission(Permission permission) {
		getPermissions().add(permission);
		permission.setFunction(this);

		return permission;
	}

	public Permission removePermission(Permission permission) {
		getPermissions().remove(permission);
		permission.setFunction(null);

		return permission;
	}

	public String getIconType() {
		return iconType;
	}

	public void setIconType(String iconType) {
		this.iconType = iconType;
	}
}