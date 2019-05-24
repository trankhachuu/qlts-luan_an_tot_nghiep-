package tpm.qlts.custommodels;

public class options {

	private String value;
	private String label;
	private String tenTinhTrang;
	private String moTa;
	
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
	
	public String getTenTinhTrang() {
		return tenTinhTrang;
	}
	public void setTenTinhTrang(String tenTinhTrang) {
		this.tenTinhTrang = tenTinhTrang;
	}
	public String getMoTa() {
		return moTa;
	}
	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}
	
	public options(String value, String label, String tenTinhTrang, String moTa) {
		super();
		this.value = value;
		this.label = label;
		this.tenTinhTrang = tenTinhTrang;
		this.moTa = moTa;
	}
	public options() {
		super();
		// TODO Auto-generated constructor stub
	}
}
