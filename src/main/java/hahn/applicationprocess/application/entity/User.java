package hahn.applicationprocess.application.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import hahn.applicationprocess.application.exception.UserNotFoundException;

@Entity
@Table(name = "user")
public class User {

	// annotate class as an entity and map to db table

	// Define the fields and annotate with column names

	// Set mapping to Address entity

	// Set mapping to Asset entity

	// Generate constructors

	// Generate getters and setters

	// Generate the toString() method

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "age")
	private int age;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email")
	private String Email;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;

	@ManyToMany( cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinTable(name = "user_asset", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "asset_id"))
	@JsonIgnore
	private Set<Asset> assets;

	public void addAsset(Asset theAsset) {
		if (assets == null) {
			assets = new HashSet<>();
		}
		assets.add(theAsset);
	}
	
	public void removeAsset(Asset theAsset) {
		if (assets == null || !assets.contains(theAsset)) {
			throw new UserNotFoundException("Asset not found on user : " + theAsset.getName());
		}
		assets.remove(theAsset);
	}

	public Set<Asset> getAssets() {
		return assets;
	}

	public void setAssets(Set<Asset> assets) {
		this.assets = assets;
	}

	public User() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public User(int age, String firstName, String lastName, String email) {
		this.age = age;
		this.firstName = firstName;
		this.lastName = lastName;
		Email = email;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", age=" + age + ", firstName=" + firstName + ", lastName=" + lastName + ", Email="
				+ Email + ", address=" + address + "]";
	}

}
