package tpm.qlts.custommodels;

import java.util.List;

public class BangiaoOptions {
	
	private String label;
	private List<option> options;
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public List<option> getOptions() {
		return options;
	}
	public void setOptions(List<option> options) {
		this.options = options;
	}
	public BangiaoOptions(String label, List<option> options) {
		super();
		this.label = label;
		this.options = options;
	}
	public BangiaoOptions() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
