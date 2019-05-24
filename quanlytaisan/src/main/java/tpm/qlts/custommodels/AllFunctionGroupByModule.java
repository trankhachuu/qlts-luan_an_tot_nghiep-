package tpm.qlts.custommodels;

import java.util.List;

import tpm.qlts.entitys.Function;

public class AllFunctionGroupByModule {
	private int functionID; // moduleID
	private String functionName; // moduleName
	private List<Function> lstFunction;

	public AllFunctionGroupByModule(int functionID, String functionName, List<Function> lstFunction) {
		super();
		this.functionID = functionID;
		this.functionName = functionName;
		this.lstFunction = lstFunction;
	}

	public int getFunctionID() {
		return functionID;
	}

	public void setFunctionID(int functionID) {
		this.functionID = functionID;
	}

	public String getFunctionName() {
		return functionName;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public List<Function> getLstFunction() {
		return lstFunction;
	}

	public void setLstFunction(List<Function> lstFunction) {
		this.lstFunction = lstFunction;
	}

	public AllFunctionGroupByModule() {
		super();
		// TODO Auto-generated constructor stub
	}
}
