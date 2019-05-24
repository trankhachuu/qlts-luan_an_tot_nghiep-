package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the Group_Function database table.
 * 
 */
@Embeddable
public class GroupRefFunctionPK implements Serializable {
	// default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name = "GroupID", insertable = false, updatable = false)
	private int groupID;

	@Column(name = "FunctionID", insertable = false, updatable = false)
	private int functionID;

	public GroupRefFunctionPK() {
	}

	public GroupRefFunctionPK(int groupID, int functionID) {
		super();
		this.groupID = groupID;
		this.functionID = functionID;
	}

	public int getGroupID() {
		return this.groupID;
	}

	public void setGroupID(int groupID) {
		this.groupID = groupID;
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
		if (!(other instanceof GroupRefFunctionPK)) {
			return false;
		}
		GroupRefFunctionPK castOther = (GroupRefFunctionPK) other;
		return (this.groupID == castOther.groupID) && (this.functionID == castOther.functionID);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.groupID;
		hash = hash * prime + this.functionID;

		return hash;
	}
}