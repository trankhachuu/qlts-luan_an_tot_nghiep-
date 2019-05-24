package tpm.qlts.entitys;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the Group_Function database table.
 * 
 */
@Entity
@Table(name = "Group_Function")
@NamedQuery(name = "GroupRefFunction.findAll", query = "SELECT g FROM GroupRefFunction g")
public class GroupRefFunction implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private GroupRefFunctionPK id;

	@Column(name = "GroupID", updatable = false, insertable = false)
	private int groupID;
	
	@Column(name = "FunctionID", insertable = false, updatable = false)
	private int functionID;

	// bi-directional many-to-one association to Function
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "FunctionID", updatable = false, insertable = false)
	private Function function;

	// bi-directional many-to-one association to Group
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "GroupID", updatable = false, insertable = false)
	private Group group;

	public GroupRefFunction() {
	}

	public GroupRefFunction(GroupRefFunctionPK id) {
		super();
		this.id = id;
	}

	public GroupRefFunctionPK getId() {
		return this.id;
	}

	public void setId(GroupRefFunctionPK id) {
		this.id = id;
	}

	public Function getFunction() {
		return this.function;
	}

	public void setFunction(Function function) {
		this.function = function;
	}

	public Group getGroup() {
		return this.group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public int getGroupID() {
		return groupID;
	}

	public void setGroupID(int groupID) {
		this.groupID = groupID;
	}

}