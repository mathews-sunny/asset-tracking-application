package hahn.applicationprocess.application.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "asset")
public class Asset {
	// annotate class as an entity and map to db table

	// Define the fields and annotate with column names

	// Generate constructors

	// Generate getters and setters

	// Generate the toString() method

	@Id
	@Column(name = "id")
	private String id;

	@Column(name = "symbol")
	private String symbol;

	@Column(name = "name")
	private String name;

	public Asset() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Asset(String id, String symbol, String name) {
		this.id = id;
		this.symbol = symbol;
		this.name = name;
	}

	@Override
	public String toString() {
		return "Asset [id=" + id + ", symbol=" + symbol + ", name=" + name + "]";
	}
}
