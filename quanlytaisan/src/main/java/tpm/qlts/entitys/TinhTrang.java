package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the TinhTrang database table.
 * 
 */
@Entity
@NamedQuery(name="TinhTrang.findAll", query="SELECT t FROM TinhTrang t")
public class TinhTrang implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="MaTinhTrang")
	private String maTinhTrang;

	@Column(name="MoTa")
	private String moTa;

	@Column(name="TenTinhTrang")
	private String tenTinhTrang;

	//bi-directional many-to-one association to TinhTrangRefThietBi
	@JsonIgnore
	@OneToMany(mappedBy="tinhTrang")
	private List<TinhTrangRefThietBi> ttTbs;

	public TinhTrang() {
	}

	public String getMaTinhTrang() {
		return this.maTinhTrang;
	}

	public void setMaTinhTrang(String maTinhTrang) {
		this.maTinhTrang = maTinhTrang;
	}

	public String getMoTa() {
		return this.moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public String getTenTinhTrang() {
		return this.tenTinhTrang;
	}

	public void setTenTinhTrang(String tenTinhTrang) {
		this.tenTinhTrang = tenTinhTrang;
	}

	public List<TinhTrangRefThietBi> getTtTbs() {
		return this.ttTbs;
	}

	public void setTtTbs(List<TinhTrangRefThietBi> ttTbs) {
		this.ttTbs = ttTbs;
	}

	public TinhTrangRefThietBi addTtTb(TinhTrangRefThietBi ttTb) {
		getTtTbs().add(ttTb);
		ttTb.setTinhTrang(this);

		return ttTb;
	}

	public TinhTrangRefThietBi removeTtTb(TinhTrangRefThietBi ttTb) {
		getTtTbs().remove(ttTb);
		ttTb.setTinhTrang(null);

		return ttTb;
	}

	public TinhTrang(String maTinhTrang) {
		super();
		this.maTinhTrang = maTinhTrang;
	}
	
	

}