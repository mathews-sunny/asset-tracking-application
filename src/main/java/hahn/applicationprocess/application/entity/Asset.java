package hahn.applicationprocess.application.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="asset")
public class Asset {
	// annotate class as an entity and map to db table

	// Define the fields and annotate with column names

	// Generate constructors

	// Generate getters and setters

	// Generate the toString() method
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="asset_id")
	private String assetId;
	
	@Column(name="asset_symbol")
	private String symbol;
	
	@Column(name="asset_name")
	private String name;
	
	public Asset() {
		
	}

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
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

	public Asset(String assetId, String symbol, String name) {
		this.assetId = assetId;
		this.symbol = symbol;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Asset [id=" + id + ", assetId=" + assetId + ", symbol=" + symbol + ", name=" + name + "]";
	}
	
}
