package hahn.applicationprocess.application.dao;

import java.util.List;

import org.springframework.http.ResponseEntity;

import hahn.applicationprocess.application.entity.Asset;
import hahn.applicationprocess.application.success.AssetCreatedResponse;
import hahn.applicationprocess.application.success.UserSuccessResponse;

public interface AssetDAO {

	public List<Asset> getAssets(int theUserid);

	public ResponseEntity<AssetCreatedResponse> saveAsset(Asset theAsset, int theUserId);
	
	public ResponseEntity<UserSuccessResponse> updateAsset(Asset theAsset);

	public Asset getAsset(int theId);

	public ResponseEntity<UserSuccessResponse> deleteAsset(int theId);
	
}
