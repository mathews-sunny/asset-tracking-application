package hahn.applicationprocess.application.service;

import java.util.Set;

import org.springframework.http.ResponseEntity;

import hahn.applicationprocess.application.entity.Asset;
import hahn.applicationprocess.application.success.AssetCreatedResponse;
import hahn.applicationprocess.application.success.UserSuccessResponse;

public interface AssetService {

	public Set<Asset> getAssets(int theUserId);

	public ResponseEntity<AssetCreatedResponse> saveAsset(Asset theAsset, int theUserId);

	public Asset getAsset(String theId);

	public ResponseEntity<UserSuccessResponse> deleteAsset(int userId, String id);
	
}
