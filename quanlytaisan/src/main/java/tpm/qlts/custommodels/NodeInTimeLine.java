package tpm.qlts.custommodels;

import java.util.Date;

public class NodeInTimeLine {
	private String id;
	private String type;
	private String maInNode;
	private String tenInNode;
	private Date tuNgay;
	private Date denNgay;
	private int maPhieu;
	private String tenDonVi;
	private String timestame;

	public String getTimestame() {
		return timestame;
	}

	public void setTimestame(String timestame) {
		this.timestame = timestame;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMaInNode() {
		return maInNode;
	}

	public void setMaInNode(String maInNode) {
		this.maInNode = maInNode;
	}

	public String getTenInNode() {
		return tenInNode;
	}

	public void setTenInNode(String tenInNode) {
		this.tenInNode = tenInNode;
	}

	public Date getTuNgay() {
		return tuNgay;
	}

	public void setTuNgay(Date tuNgay) {
		this.tuNgay = tuNgay;
	}

	public Date getDenNgay() {
		return denNgay;
	}

	public void setDenNgay(Date denNgay) {
		this.denNgay = denNgay;
	}

	public int getMaPhieu() {
		return maPhieu;
	}

	public void setMaPhieu(int maPhieu) {
		this.maPhieu = maPhieu;
	}

	public String getTenDonVi() {
		return tenDonVi;
	}

	public void setTenDonVi(String tenDonVi) {
		this.tenDonVi = tenDonVi;
	}

	public NodeInTimeLine(String id, String type, String maInNode, String tenInNode, Date tuNgay, Date denNgay,
			int maPhieu) {
		super();
		this.id = id;
		this.type = type;
		this.maInNode = maInNode;
		this.tenInNode = tenInNode;
		this.tuNgay = tuNgay;
		this.denNgay = denNgay;
		this.maPhieu = maPhieu;
	}

	public NodeInTimeLine() {
		super();
		// TODO Auto-generated constructor stub
	}

}
