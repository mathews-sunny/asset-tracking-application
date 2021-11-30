package hahn.applicationprocess.application.success;

import hahn.applicationprocess.application.entity.Asset;

public class AssetCreatedResponse {

	private int status;
	private String message;
	private Asset asset;
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Asset getAsset() {
		return asset;
	}
	public void setAsset(Asset asset) {
		this.asset = asset;
	}
	public AssetCreatedResponse() {

	}
	public AssetCreatedResponse(int status, String message, Asset asset) {
		this.status = status;
		this.message = message;
		this.asset = asset;
	}
	
}
