package hahn.applicationprocess.application.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "address")
public class Address {
	// annotate class as an entity and map to db table

	// Define the fields and annotate with column names

	// Generate constructors

	// Generate getters and setters

	// Generate the toString() method

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "postal_code")
	private int postalCode;
	
	@Column(name = "house_number")
	private String houseNumber;
	
	@Column(name = "street")
	private String street;

	public Address() {

	}

	public Address(int postalCode, String houseNumber, String street) {
		this.postalCode = postalCode;
		this.houseNumber = houseNumber;
		this.street = street;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(int postalCode) {
		this.postalCode = postalCode;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	@Override
	public String toString() {
		return "Address [id=" + id + ", postalCode=" + postalCode + ", houseNumber=" + houseNumber + ", street="
				+ street + "]";
	}

}
