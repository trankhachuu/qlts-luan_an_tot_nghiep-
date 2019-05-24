package tpm.qlts.repositorys;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import tpm.qlts.entitys.Users;

@Repository("userRepository")
public interface UserRepository extends CrudRepository<Users, String> {

	@Query("select u from Users u where u.username = :userName")
	public Users findByUserName(@Param("userName") String userName);
	
	@Query("select u.password from Users u where u.userID = :userID")
	public String getPasswordByID(@Param("userID") String userID);
}
