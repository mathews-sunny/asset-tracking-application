package hahn.applicationprocess.application.dao;

import java.util.List;
import java.util.regex.Pattern;

import javax.persistence.NoResultException;

import org.apache.commons.validator.routines.DomainValidator;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import hahn.applicationprocess.application.entity.User;
import hahn.applicationprocess.application.exception.InvalidUserException;
import hahn.applicationprocess.application.exception.UserNotFoundException;
import hahn.applicationprocess.application.success.UserSuccessResponse;

@Repository
public class UserDAOImpl implements UserDAO {

	// need to inject the session factory
	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private DomainValidator domainValidator;

	@Override
	public List<User> getUsers() {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		// create a query ...
		Query<User> theQuery = currentSession.createQuery("from User", User.class);

		// execute query and get result list
		List<User> users = theQuery.getResultList();
		if (users.isEmpty()) {
			throw new UserNotFoundException("No Record Found");
		}

		// return the results
		return users;
	}

	@Override
	public ResponseEntity<UserSuccessResponse> saveUser(User theUser) {

		// get current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		validateUser(theUser);
		validateEmail(theUser.getEmail());

		// save/upate the User ...
		UserSuccessResponse response = new UserSuccessResponse();
		response.setStatus(HttpStatus.CREATED.value());
		response.setId(currentSession.save(theUser).toString());
		response.setMessage("User is created successfully");
		return new ResponseEntity<>(response, HttpStatus.CREATED);

	}

	@Override
	public ResponseEntity<UserSuccessResponse> updateUser(User theUser) {

		// get current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		validateUser(theUser);
		validateEmail(theUser.getEmail());
		
		Query<User> theQuery = currentSession
				.createQuery("from User u where u.Email=:emailId", User.class);
		theQuery.setParameter("emailId", theUser.getEmail());

		User theUpdatingUser = null;
		try {
			theUpdatingUser = (User) theQuery.getSingleResult();
		} catch (NoResultException ex) {
			throw new UserNotFoundException("User not found");
		}
		
		currentSession.evict(theUpdatingUser);
		// save/upate the User ...
		currentSession.update(theUser);
		UserSuccessResponse response = new UserSuccessResponse();
		response.setStatus(HttpStatus.OK.value());
		response.setMessage("Updated User Details");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public User getUser(int theId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		// now retrieve/read from database using the primary key
		User theUser = currentSession.get(User.class, theId);

		if (theUser == null) {
			throw new UserNotFoundException("User not found");
		}

		return theUser;
	}

	@Override
	public User getUserDetails(String mailId, String firstName) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		if (firstName.trim().length() < 3) {
			throw new InvalidUserException("Input more than 3 characters for first name");
		}
		validateEmail(mailId);

		// now retrieve/read from database using the mail id and first name
		Query<User> theQuery = currentSession
				.createQuery("from User u where u.Email=:emailId and u.firstName=:firstName", User.class);
		theQuery.setParameter("emailId", mailId);
		theQuery.setParameter("firstName", firstName);
		User theUser = null;
		try {
			theUser = (User) theQuery.getSingleResult();
		} catch (NoResultException ex) {
			throw new UserNotFoundException("User not found");
		}

		return theUser;
	}

	@Override
	public ResponseEntity<UserSuccessResponse> deleteUser(int theId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		User theUser = currentSession.get(User.class, theId);
		if (theUser == null) {
			throw new UserNotFoundException("User not found");
		}
		// delete object with primary key
		UserSuccessResponse response = new UserSuccessResponse();
		response.setStatus(HttpStatus.OK.value());
		response.setMessage("Deleted user : " + theUser.getFirstName());
		currentSession.delete(theUser);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	public boolean validateEmail(String mailId) {
		boolean validFlag = true;
		int length = mailId.trim().length();
		int index = mailId.lastIndexOf('.');
		String nonDomain = "";
		String domain = "";
		String regex = "[0-9a-zA-Z]+(.[0-9a-zA-Z]+)?@[0-9A-Za-z]+(.[0-9a-zA-Z]+)?";
		if (index > -1) {
			nonDomain = mailId.substring(0, index);
			domain = mailId.substring(index + 1, length);
		}

		if (length == 0) {
			validFlag = false;
			throw new InvalidUserException("Please provide a mail id!");
		} else if (index == -1 || !Pattern.matches(regex, nonDomain)) {
			validFlag = false;
			throw new InvalidUserException("Invalid mail id");
		} else if (!domainValidator.isValidCountryCodeTld(domain) && !domainValidator.isValidInfrastructureTld(domain)
				&& !domainValidator.isValidGenericTld(domain)) {
			validFlag = false;
			throw new InvalidUserException("Invalid Top Level Domain for the mail");
		}
		return validFlag;
	}

	public boolean validateUser(User theUser) {
		boolean validFlag = true;
		if (theUser.getAge() <= 18) {
			validFlag = false;
			throw new InvalidUserException("User age should be more than 18");
		} else if (theUser.getFirstName().trim().length() < 3) {
			validFlag = false;
			throw new InvalidUserException("Input more than 3 characters for first name");
		} else if (theUser.getLastName().trim().length() < 3) {
			validFlag = false;
			throw new InvalidUserException("Input more than 3 characters for Last name");
		} else if (theUser.getAddress().getStreet().trim().length() == 0) {
			validFlag = false;
			throw new InvalidUserException("Street name cannot be empty");
		} else if (theUser.getAddress().getHouseNumber().trim().length() == 0) {
			validFlag = false;
			throw new InvalidUserException("House number cannot be empty");
		} else if (theUser.getAddress().getPostalCode() == 0) {
			validFlag = false;
			throw new InvalidUserException("Enter a valid postal code");
		}
		return validFlag;
	}

}
