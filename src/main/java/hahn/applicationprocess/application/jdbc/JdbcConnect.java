package hahn.applicationprocess.application.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;

public class JdbcConnect {
	public static void main(String[] args) {

		String jdbcUrl = "jdbc:mysql://localhost:3306/user_asset_tracker?useSSL=false&serverTimezone=UTC";
		String user = "hahnapplication";
		String pass = "7a6B2I51o#e*3";

		try {
			System.out.println("Connecting to database: " + jdbcUrl);

			Connection myConn = DriverManager.getConnection(jdbcUrl, user, pass);

			System.out.println("Connection successful!!!");

		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
}
