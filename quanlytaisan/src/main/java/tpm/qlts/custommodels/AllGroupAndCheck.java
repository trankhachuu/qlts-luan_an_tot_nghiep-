package tpm.qlts.custommodels;

import java.util.List;

import tpm.qlts.entitys.Group;

public class AllGroupAndCheck {
	private List<Group> lstGroups;
	private List<Integer> checked;

	public List<Group> getLstGroups() {
		return lstGroups;
	}

	public void setLstGroups(List<Group> lstGroups) {
		this.lstGroups = lstGroups;
	}

	public List<Integer> getChecked() {
		return checked;
	}

	public void setChecked(List<Integer> checked) {
		this.checked = checked;
	}

	public AllGroupAndCheck(List<Group> lstGroups, List<Integer> checked) {
		super();
		this.lstGroups = lstGroups;
		this.checked = checked;
	}

}
