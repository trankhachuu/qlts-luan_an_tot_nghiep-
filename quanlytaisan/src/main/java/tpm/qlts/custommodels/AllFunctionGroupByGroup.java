package tpm.qlts.custommodels;

import java.util.List;

import tpm.qlts.entitys.Function;

public class AllFunctionGroupByGroup {
	private int groupID;
	private String groupName;
	private List<Function> lstFunction;

	public AllFunctionGroupByGroup() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AllFunctionGroupByGroup(int groupID, String groupName, List<Function> lstFunction) {
		super();
		this.groupID = groupID;
		this.groupName = groupName;
		this.lstFunction = lstFunction;
	}

	public int getGroupID() {
		return groupID;
	}

	public void setGroupID(int groupID) {
		this.groupID = groupID;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public List<Function> getLstFunction() {
		return lstFunction;
	}

	public void setLstFunction(List<Function> lstFunction) {
		this.lstFunction = lstFunction;
	}

}
