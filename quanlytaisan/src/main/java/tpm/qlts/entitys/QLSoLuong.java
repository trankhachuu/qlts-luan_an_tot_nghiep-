package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the QLSoLuong database table.
 * 
 */
@Entity
@NamedQuery(name="QLSoLuong.findAll", query="SELECT q FROM QLSoLuong q")
public class QLSoLuong implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private QLSoLuongPK id;

	@Column(name="SoLuong")
	private int soLuong;

	public QLSoLuong() {
	}

	public QLSoLuongPK getId() {
		return this.id;
	}

	public void setId(QLSoLuongPK id) {
		this.id = id;
	}

	public int getSoLuong() {
		return this.soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

}