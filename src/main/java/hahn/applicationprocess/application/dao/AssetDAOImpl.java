package hahn.applicationprocess.application.dao;

import java.util.LinkedHashMap;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
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
	public List<Asset> getAssets(int theUserId) {
		
		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
				
		// create a query  ...
		User theUser = currentSession.get(User.class, theUserId);
		if(theUser == null) {
			throw new UserNotFoundException("User not found : "+theUserId);
		}
		Query<Asset> theQuery = 
				currentSession.createQuery("from Asset Where user_id=:userId",
						Asset.class);
		theQuery.setParameter("userId", theUserId);
		
		// execute query and get result list
		List<Asset> assets = theQuery.getResultList();
		if(assets.isEmpty()) {
			throw new UserNotFoundException("No Assets Tracked");
		}
				
		// return the results		
		return assets;
	}

	@Override
	public ResponseEntity<AssetCreatedResponse> saveAsset(Asset theAsset, int theUserId) {

		// get current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		String url ="https://api.coincap.io/v2/assets/"+theAsset.getAssetId();
		Object object = null;
		try {
		object= restTemplate.getForObject(url, Object.class);
		}catch (HttpClientErrorException ex) {
			if(ex.getMessage().contains("429 Too Many Requests")){
				throw new AssetApiException("CoinCap API is busy! Try again");
			}else if(ex.getMessage().contains("404 Not Found"))  {
				throw new AssetApiException("Invalid AssetId");
			}
		}
		
		@SuppressWarnings("unchecked")
		LinkedHashMap< String, LinkedHashMap<String, String>> result= (LinkedHashMap<String, LinkedHashMap<String, String>>) object;
		if(!(result.get("data").get("name").equals(theAsset.getName().trim()))){
			throw new AssetApiException("No match for the given Asset Id and name.");
		}
		if(!(result.get("data").get("symbol").equals(theAsset.getSymbol().trim()))) {
			throw new AssetApiException("No match for the given Asset Id and symbol.");
		}
		
		User theUser = currentSession.get(User.class, theUserId);
		if(theUser == null) {
			throw new UserNotFoundException("User not found : "+theUserId);
		}
		
		theUser.addAsset(theAsset);
		// save/upate the User ... 
		currentSession.save(theUser);
		AssetCreatedResponse response = new AssetCreatedResponse();
		response.setStatus(HttpStatus.CREATED.value());
		currentSession.flush();
		System.out.println(theAsset);
		response.setAsset(theAsset);
		response.setMessage("Asset Added Successfully");
		return new ResponseEntity<>(response, HttpStatus.CREATED);
		
	}
	
	@Override
	public ResponseEntity<UserSuccessResponse> updateAsset(Asset theAsset) {

		// get current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		String url ="https://api.coincap.io/v2/assets/"+theAsset.getAssetId();
		Object object = null;
		try {
		object= restTemplate.getForObject(url, Object.class);
		}catch (HttpClientErrorException ex) {
			if(ex.getMessage().contains("429 Too Many Requests")){
				throw new AssetApiException("CoinCap API is busy! Try again");
			}else if(ex.getMessage().contains("404 Not Found"))  {
				throw new AssetApiException("Invalid AssetId");
			}
		}
		
		@SuppressWarnings("unchecked")
		LinkedHashMap< String, LinkedHashMap<String, String>> result= (LinkedHashMap<String, LinkedHashMap<String, String>>) object;
		if(!(result.get("data").get("name").equals(theAsset.getName().trim()))){
			throw new AssetApiException("No match for the given Asset Id and name.");
		}
		if(!(result.get("data").get("symbol").equals(theAsset.getSymbol().trim()))) {
			throw new AssetApiException("No match for the given Asset Id and symbol.");
		}
		
		currentSession.update(theAsset);
		UserSuccessResponse response = new UserSuccessResponse();
		response.setStatus(HttpStatus.CREATED.value());
		response.setMessage("Asset Updated Successfully");
		return new ResponseEntity<>(response, HttpStatus.CREATED);
		
	}

	@Override
	public Asset getAsset(int theId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		// now retrieve/read from database using the primary key
		Asset theAsset = currentSession.get(Asset.class, theId);
		if(theAsset == null) {
			throw new UserNotFoundException("Asset not found : "+theId);
		}
		return theAsset;
	}

	@Override
	public ResponseEntity<UserSuccessResponse> deleteAsset(int theId) {

		// get the current hibernate session
		Session currentSession = sessionFactory.getCurrentSession();
		
		Asset theAsset = currentSession.get(Asset.class, theId);
		if(theAsset == null) {
			throw new UserNotFoundException("Asset not found : "+theId);
		}
		// delete object with primary key
		UserSuccessResponse response = new UserSuccessResponse();
		response.setStatus(HttpStatus.OK.value());
		response.setMessage("Removed Asset : "+theAsset.getName());
		currentSession.delete(theAsset);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

}











