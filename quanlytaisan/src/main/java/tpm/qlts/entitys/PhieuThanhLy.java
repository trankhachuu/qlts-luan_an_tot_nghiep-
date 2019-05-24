package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the PhieuThanhLy database table.
 * 
 */
@Entity
@NamedQuery(name="PhieuThanhLy.findAll", query="SELECT p FROM PhieuThanhLy p")
public class PhieuThanhLy implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="MaPhieuThanhLy")
	private String maPhieuThanhLy;

	@Column(name="DiaDiem")
	private String diaDiem;

	@Column(name="HoiDongThanhLy")
	private String hoiDongThanhLy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="NgayLapPhieu")
	private Date ngayLapPhieu;

	@Column(name="NoiDung")
	private String noiDung;

	//bi-directional many-to-one association to ThietBi
	@OneToMany(mappedBy="phieuThanhLy")
	private List<ThietBi> thietBis;

	public PhieuThanhLy() {
	}

	public String getMaPhieuThanhLy() {
		return this.maPhieuThanhLy;
	}

	public void setMaPhieuThanhLy(String maPhieuThanhLy) {
		this.maPhieuThanhLy = maPhieuThanhLy;
	}

	public String getDiaDiem() {
		return this.diaDiem;
	}

	public void setDiaDiem(String diaDiem) {
		this.diaDiem = diaDiem;
	}

	public String getHoiDongThanhLy() {
		return this.hoiDongThanhLy;
	}

	public void setHoiDongThanhLy(String hoiDongThanhLy) {
		this.hoiDongThanhLy = hoiDongThanhLy;
	}

	public Date getNgayLapPhieu() {
		return this.ngayLapPhieu;
	}

	public void setNgayLapPhieu(Date ngayLapPhieu) {
		this.ngayLapPhieu = ngayLapPhieu;
	}

	public String getNoiDung() {
		return this.noiDung;
	}

	public void setNoiDung(String noiDung) {
		this.noiDung = noiDung;
	}

	public List<ThietBi> getThietBis() {
		return this.thietBis;
	}

	public void setThietBis(List<ThietBi> thietBis) {
		this.thietBis = thietBis;
	}

	public ThietBi addThietBi(ThietBi thietBi) {
		getThietBis().add(thietBi);
		thietBi.setPhieuThanhLy(this);

		return thietBi;
	}

	public ThietBi removeThietBi(ThietBi thietBi) {
		getThietBis().remove(thietBi);
		thietBi.setPhieuThanhLy(null);

		return thietBi;
	}

}