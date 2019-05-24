package tpm.qlts.entitys;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * The primary key class for the TT_TB database table.
 * 
 */
@Embeddable
public class TinhTrangRefThietBiPK implements Serializable {
	// default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name = "MaTinhTrang", insertable = false, updatable = false)
	private String maTinhTrang;

	@Column(name = "MaThietBi", insertable = false, updatable = false)
	private long maThietBi;

	@Column(name = "MaPhieuBaoTri", insertable = false, updatable = false)
	private int maPhieuBaoTri;

	public int getMaPhieuBaoTri() {
		return maPhieuBaoTri;
	}

	public void setMaPhieuBaoTri(int maPhieuBaoTri) {
		this.maPhieuBaoTri = maPhieuBaoTri;
	}

	public TinhTrangRefThietBiPK() {
	}

	public String getMaTinhTrang() {
		return this.maTinhTrang;
	}

	public void setMaTinhTrang(String maTinhTrang) {
		this.maTinhTrang = maTinhTrang;
	}

	public long getMaThietBi() {
		return this.maThietBi;
	}

	public void setMaThietBi(long maThietBi) {
		this.maThietBi = maThietBi;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof TinhTrangRefThietBiPK)) {
			return false;
		}
		TinhTrangRefThietBiPK castOther = (TinhTrangRefThietBiPK) other;
		return this.maTinhTrang.equals(castOther.maTinhTrang) && (this.maThietBi == castOther.maThietBi);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.maTinhTrang.hashCode();
		hash = hash * prime + ((int) (this.maThietBi ^ (this.maThietBi >>> 32)));

		return hash;
	}

	public TinhTrangRefThietBiPK(String maTinhTrang, long maThietBi, int maPhieuBaoTri) {
		super();
		this.maTinhTrang = maTinhTrang;
		this.maThietBi = maThietBi;
		this.maPhieuBaoTri = maPhieuBaoTri;
	}

}