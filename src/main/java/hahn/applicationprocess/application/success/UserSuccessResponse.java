package hahn.applicationprocess.application.success;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserSuccessResponse {
	private int status;
	private String message;
	@JsonIgnore
	String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public UserSuccessResponse() {

	}

	public UserSuccessResponse(int status, String message, String id) {
		this.status = status;
		this.message = message;
		this.id = id;
	}

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

}
