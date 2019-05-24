package tpm.qlts.custommodels;

import java.util.List;

public class PermisionUpdate {
	private String userID;
	private List<Integer> groupIDs;

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public List<Integer> getGroupIDs() {
		return groupIDs;
	}

	public void setGroupIDs(List<Integer> groupIDs) {
		this.groupIDs = groupIDs;
	}

	public PermisionUpdate() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PermisionUpdate(String userID, List<Integer> groupIDs) {
		super();
		this.userID = userID;
		this.groupIDs = groupIDs;
	}

}
