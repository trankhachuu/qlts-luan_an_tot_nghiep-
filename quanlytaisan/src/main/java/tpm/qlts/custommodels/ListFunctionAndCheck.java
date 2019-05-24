package tpm.qlts.custommodels;

import java.util.List;

public class ListFunctionAndCheck {
	private List<AllFunctionGroupByGroup> lstFunctionGroupByGroup;
	private int[] lstCheck;

	public List<AllFunctionGroupByGroup> getLstFunctionGroupByGroup() {
		return lstFunctionGroupByGroup;
	}

	public void setLstFunctionGroupByGroup(List<AllFunctionGroupByGroup> lstFunctionGroupByGroup) {
		this.lstFunctionGroupByGroup = lstFunctionGroupByGroup;
	}

	public int[] getLstCheck() {
		return lstCheck;
	}

	public void setLstCheck(int[] lstCheck) {
		this.lstCheck = lstCheck;
	}

	public ListFunctionAndCheck(List<AllFunctionGroupByGroup> lstFunctionGroupByGroup, int[] lstCheck) {
		super();
		this.lstFunctionGroupByGroup = lstFunctionGroupByGroup;
		this.lstCheck = lstCheck;
	}

}
