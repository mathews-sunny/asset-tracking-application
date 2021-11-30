package hahn.applicationprocess.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hahn.applicationprocess.application.dao.AssetDAO;
import hahn.applicationprocess.application.entity.Asset;
import hahn.applicationprocess.application.success.AssetCreatedResponse;
import hahn.applicationprocess.application.success.UserSuccessResponse;

@Service
public class AssetServiceImpl implements AssetService {

	// need to inject Asset dao
	@Autowired
	private AssetDAO assetDAO;
	
	@Override
	@Transactional
	public List<Asset> getAssets(int theUserId) {
		return assetDAO.getAssets(theUserId);
	}

	@Override
	@Transactional
	public ResponseEntity<AssetCreatedResponse> saveAsset(Asset theAsset, int theUserId) {

		return assetDAO.saveAsset(theAsset, theUserId);
	}
	
	@Override
	@Transactional
	public ResponseEntity<UserSuccessResponse> updateAsset(Asset theAsset) {

		return assetDAO.updateAsset(theAsset);
	}	

	@Override
	@Transactional
	public Asset getAsset(int theId) {
		return assetDAO.getAsset(theId);
	}

	@Override
	@Transactional
	public ResponseEntity<UserSuccessResponse> deleteAsset(int theId) {
		return assetDAO.deleteAsset(theId);
	}
}





