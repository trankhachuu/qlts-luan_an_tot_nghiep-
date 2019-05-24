package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the User_Group database table.
 * 
 */
@Embeddable
public class UserRefGroupPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="UserID", insertable=false, updatable=false)
	private String userID;

	@Column(name="GroupID", insertable=false, updatable=false)
	private int groupID;

	public UserRefGroupPK() {
	}
	
	
	public UserRefGroupPK(String userID, int groupID) {
		super();
		this.userID = userID;
		this.groupID = groupID;
	}

	public String getUserID() {
		return this.userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public int getGroupID() {
		return this.groupID;
	}
	public void setGroupID(int groupID) {
		this.groupID = groupID;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof UserRefGroupPK)) {
			return false;
		}
		UserRefGroupPK castOther = (UserRefGroupPK)other;
		return 
			this.userID.equals(castOther.userID)
			&& (this.groupID == castOther.groupID);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userID.hashCode();
		hash = hash * prime + this.groupID;
		
		return hash;
	}
}