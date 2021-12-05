package hahn.applicationprocess.application.dao;

import java.util.LinkedHashMap;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import hahn.applicationprocess.application.entity.Asset;
import hahn.applicationprocess.application.entity.User;
import hahn.applicationprocess.application.exception.AssetApiException;
import hahn.applicationprocess.application.exception.UserNotFoundException;
import hahn.applicationprocess.application.success.AssetCreatedResponse;
import hahn.applicationprocess.application.success.UserSuccessResponse;

@Repository
public class AssetDAOImpl implements AssetDAO {

	// need to inject the session factory
	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public Set<Asset> getAssets(int theUserId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		// create a query ...
		User theUser = currentSession.get(User.class, theUserId);
		if (theUser == null) {
			throw new UserNotFoundException("User not found");
		}

		// execute query and get result list
		Set<Asset> assets =  theUser.getAssets();
		if (assets.isEmpty()) {
			throw new UserNotFoundException("No Assets Tracked!");
		}

		// return the results
		return assets;
	}

	@Override
	public ResponseEntity<AssetCreatedResponse> saveAsset(Asset theAsset, int theUserId) {

		// get current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		String url = "https://api.coincap.io/v2/assets/" + theAsset.getId();
		Object object = null;
		try {
			object = restTemplate.getForObject(url, Object.class);
		} catch (HttpClientErrorException ex) {
			if (ex.getMessage().contains("429 Too Many Requests")) {
				throw new AssetApiException("CoinCap API is busy! Try again");
			} else if (ex.getMessage().contains("404 Not Found")) {
				throw new AssetApiException("Invalid Asset Id");
			}
		}

		@SuppressWarnings("unchecked")
		LinkedHashMap<String, LinkedHashMap<String, String>> result = (LinkedHashMap<String, LinkedHashMap<String, String>>) object;
		if (!(result.get("data").get("name").equals(theAsset.getName().trim()))) {
			throw new AssetApiException("No match for the given Asset Id and name.");
		}
		if (!(result.get("data").get("symbol").equals(theAsset.getSymbol().trim()))) {
			throw new AssetApiException("No match for the given Asset Id and symbol.");
		}

		User theUser = currentSession.get(User.class, theUserId);
		if (theUser == null) {
			throw new UserNotFoundException("User not found ");
		}

		// save/upate the User ...
		currentSession.saveOrUpdate(theAsset);
		theUser.addAsset(theAsset);
		currentSession.save(theUser);
		AssetCreatedResponse response = new AssetCreatedResponse();
		response.setStatus(HttpStatus.CREATED.value());
		currentSession.flush();
		response.setAsset(theAsset);
		response.setMessage("Asset Added Successfully");
		return new ResponseEntity<>(response, HttpStatus.CREATED);

	}

	@Override
	public Asset getAsset(String theId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();

		// now retrieve/read from database using the primary key
		Asset theAsset = currentSession.get(Asset.class, theId);
		if (theAsset == null) {
			throw new UserNotFoundException("Asset not found : " + theId);
		}
		return theAsset;
	}

	@Override
	public ResponseEntity<UserSuccessResponse> deleteAsset(int userId, String id) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		User theUser = currentSession.get(User.class, userId);
		if (theUser == null) {
			throw new UserNotFoundException("User not found");
		}
		Asset theAsset = currentSession.get(Asset.class, id);
		if (theAsset == null) {
			throw new UserNotFoundException("Asset not found : " + id);
		}
		
		theUser.removeAsset(theAsset);

		UserSuccessResponse response = new UserSuccessResponse();
		response.setStatus(HttpStatus.OK.value());
		response.setMessage("Removed Asset : " + theAsset.getName());
		currentSession.save(theUser);
		return new ResponseEntity<>(response, HttpStatus.OK);

	}

}
