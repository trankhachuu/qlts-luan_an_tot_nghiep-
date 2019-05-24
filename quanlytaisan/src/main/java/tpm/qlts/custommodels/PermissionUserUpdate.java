package tpm.qlts.custommodels;

public class PermissionUserUpdate {
	private int[] lstFunction;
	private String userID;

	public PermissionUserUpdate() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PermissionUserUpdate(int[] lstFunction, String userID) {
		super();
		this.lstFunction = lstFunction;
		this.userID = userID;
	}

	public int[] getLstFunction() {
		return lstFunction;
	}

	public void setLstFunction(int[] lstFunction) {
		this.lstFunction = lstFunction;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}
}
