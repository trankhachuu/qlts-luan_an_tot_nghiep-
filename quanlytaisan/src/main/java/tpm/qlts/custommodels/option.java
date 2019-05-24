package tpm.qlts.custommodels;

public class option {
	private String value;
	private String label;
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public option(String value, String label) {
		super();
		this.value = value;
		this.label = label;
	}
	public option() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
