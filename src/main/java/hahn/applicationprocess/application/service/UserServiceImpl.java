package hahn.applicationprocess.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hahn.applicationprocess.application.dao.UserDAO;
import hahn.applicationprocess.application.entity.User;
import hahn.applicationprocess.application.success.UserSuccessResponse;

@Service
public class UserServiceImpl implements UserService {

	// need to inject user dao
	@Autowired
	private UserDAO userDAO;

	@Override
	@Transactional
	public List<User> getUsers() {
		return userDAO.getUsers();
	}

	@Override
	@Transactional
	public ResponseEntity<UserSuccessResponse> saveUser(User theUser) {

		return userDAO.saveUser(theUser);
	}

	@Override
	@Transactional
	public ResponseEntity<UserSuccessResponse> updateUser(User theUser) {

		return userDAO.updateUser(theUser);
	}

	@Override
	@Transactional
	public User getUser(int theId) {

		return userDAO.getUser(theId);
	}

	@Override
	@Transactional
	public User getUserDetails(String mailId, String firstName) {

		return userDAO.getUserDetails(mailId, firstName);
	}

	@Override
	@Transactional
	public ResponseEntity<UserSuccessResponse> deleteUser(int theId) {
		return userDAO.deleteUser(theId);
	}
}
