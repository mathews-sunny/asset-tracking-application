package hahn.applicationprocess.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hahn.applicationprocess.application.service.AssetService;
import hahn.applicationprocess.application.service.UserService;
import hahn.applicationprocess.application.success.AssetCreatedResponse;
import hahn.applicationprocess.application.success.UserSuccessResponse;
import hahn.applicationprocess.application.entity.Asset;
import hahn.applicationprocess.application.entity.User;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApplicationController {

	//autowire user service
	@Autowired
	private UserService userService;
	
	//autowire asset service
	@Autowired
	private AssetService assetService;
	
	// add code for the "/users" endpoint
	@CrossOrigin
	@GetMapping("/users")
	public List<User> getUsers() {		
		return userService.getUsers();
	}
	
	//fetch user using mail id and first name
	@CrossOrigin
	@GetMapping("/userdetails")
	public User getUserDetail(@RequestParam("UserFirstName") String firstName, @RequestParam("MailId") String mailId) {		
		return userService.getUserDetails(mailId, firstName);
	}
	
	// add code for the "/users/{userId}" endpoint
	@CrossOrigin
	@GetMapping("/users/{userId}")
	public User getUser(@PathVariable int userId) {		
		return userService.getUser(userId);
	}
	
	// add code for the delete mapping "/users/{userId}" endpoint
	@CrossOrigin
	@DeleteMapping("/users/{userId}")
	public ResponseEntity<UserSuccessResponse> deleteUser(@PathVariable int userId) {
		return userService.deleteUser(userId);
	}
	
	// add code for the post mapping "/users" endpoint
	@CrossOrigin
	@PostMapping("/users")
	public ResponseEntity<UserSuccessResponse> postUser(@RequestBody User theUser) {
		theUser.setId(0);
		return userService.saveUser(theUser);
	}
	
	// add code for the put mapping "/users" endpoint
	@CrossOrigin
	@PutMapping("/users")
	public ResponseEntity<UserSuccessResponse> updateUser(@RequestBody User theUser) {
		return userService.updateUser(theUser);
	}
	
	// add code for the "/assets" endpoint
	@CrossOrigin
	@GetMapping("/assets")
	public List<Asset> getAssets(@RequestParam("UserId") int theUserId) {		
		return assetService.getAssets(theUserId);
	}
	
	// add code for the "/assets/{assetId}" endpoint
	@CrossOrigin
	@GetMapping("/assets/{assetId}")
	public Asset getAsset(@PathVariable int assetId) {		
		return assetService.getAsset(assetId);
	}
	
	// add code for the delete mapping "/assets/{assetId}" endpoint
	@CrossOrigin
	@DeleteMapping("/assets/{assetId}")
	public ResponseEntity<UserSuccessResponse> deleteAsset(@PathVariable int assetId) {
		return assetService.deleteAsset(assetId);
	}
	
	// add code for the post mapping "/assets" endpoint
	@CrossOrigin
	@PostMapping("/assets")
	public ResponseEntity<AssetCreatedResponse> postAsset(@RequestBody Asset theAsset, @RequestParam("UserId") int theUserId) {
		theAsset.setId(0);
		return assetService.saveAsset(theAsset, theUserId);
	}
	
	// add code for the put mapping "/assets" endpoint
	@CrossOrigin
	@PutMapping("/assets")
	public ResponseEntity<UserSuccessResponse> updateUser(@RequestBody Asset theAsset) {
		return assetService.updateAsset(theAsset);
	}
}
