package tpm.qlts.custommodels;

public class PermissionItem {
	private String userID;
	private int functionID;
	private String functionName;
	private boolean status;
	private int moduleID;
	private String moduleName;

	public PermissionItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PermissionItem(String userID, int functionID, String functionName, int moduleID, String moduleName,
			boolean status) {
		super();
		this.userID = userID;
		this.functionID = functionID;
		this.functionName = functionName;
		this.moduleID = moduleID;
		this.moduleName = moduleName;
		this.status = status;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public int getFunctionID() {
		return functionID;
	}

	public void setFunctionID(int functionID) {
		this.functionID = functionID;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getFunctionName() {
		return functionName;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public int getModuleID() {
		return moduleID;
	}

	public void setModuleID(int moduleID) {
		this.moduleID = moduleID;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
}
