package tpm.qlts.custommodels;

import java.util.List;

import tpm.qlts.entitys.Function;

public class Permissions {
	private int moduleID;
	private String modulName;
	private List<Function> lstFunction;

	public int getModuleID() {
		return moduleID;
	}

	public void setModuleID(int moduleID) {
		this.moduleID = moduleID;
	}

	public String getModulName() {
		return modulName;
	}

	public void setModulName(String modulName) {
		this.modulName = modulName;
	}

	public List<Function> getLstFunction() {
		return lstFunction;
	}

	public void setLstFunction(List<Function> lstFunction) {
		this.lstFunction = lstFunction;
	}

	public Permissions(int moduleID, String modulName, List<Function> lstFunction) {
		super();
		this.moduleID = moduleID;
		this.modulName = modulName;
		this.lstFunction = lstFunction;
	}

	public Permissions() {
		super();
		// TODO Auto-generated constructor stub
	}

}
