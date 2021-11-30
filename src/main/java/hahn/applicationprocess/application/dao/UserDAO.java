package hahn.applicationprocess.application.dao;

import java.util.List;

import org.springframework.http.ResponseEntity;

import hahn.applicationprocess.application.entity.User;
import hahn.applicationprocess.application.success.UserSuccessResponse;

public interface UserDAO {

	public List<User> getUsers();

	public ResponseEntity<UserSuccessResponse> saveUser(User theUser);

	public User getUser(int theId);
	
	public User getUserDetails(String mailId, String firstName);
	
	public ResponseEntity<UserSuccessResponse> updateUser(User theUser);
	
	public ResponseEntity<UserSuccessResponse> deleteUser(int theId);
	
}
