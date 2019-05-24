package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the Permission database table.
 * 
 */
@Embeddable
public class PermissionPK implements Serializable {
	// default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name = "UserID", insertable = false, updatable = false)
	private String userID;

	@Column(name = "FunctionID", insertable = false, updatable = false)
	private int functionID;

	public PermissionPK() {
	}

	public PermissionPK(String userID, int functionID) {
		super();
		this.userID = userID;
		this.functionID = functionID;
	}

	public String getUserID() {
		return this.userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public int getFunctionID() {
		return this.functionID;
	}

	public void setFunctionID(int functionID) {
		this.functionID = functionID;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof PermissionPK)) {
			return false;
		}
		PermissionPK castOther = (PermissionPK) other;
		return this.userID.equals(castOther.userID) && (this.functionID == castOther.functionID);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userID.hashCode();
		hash = hash * prime + this.functionID;

		return hash;
	}
}