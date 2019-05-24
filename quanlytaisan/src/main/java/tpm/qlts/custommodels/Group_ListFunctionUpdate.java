package tpm.qlts.custommodels;

import java.util.List;

public class Group_ListFunctionUpdate {
	private int groupID;
	private List<Integer> lstFunction;

	public Group_ListFunctionUpdate() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Group_ListFunctionUpdate(int groupID, List<Integer> lstFunction) {
		super();
		this.groupID = groupID;
		this.lstFunction = lstFunction;
	}

	public int getGroupID() {
		return groupID;
	}

	public void setGroupID(int groupID) {
		this.groupID = groupID;
	}

	public List<Integer> getLstFunction() {
		return lstFunction;
	}

	public void setLstFunction(List<Integer> lstFunction) {
		this.lstFunction = lstFunction;
	}

}
