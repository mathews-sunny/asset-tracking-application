# hahn-applicationprocess-application

Spring Rest API along with the reactive pages could help in building efficient web applications. The hahn-applicationprocess-application is build on
React Js supported by Spring REST backend.
 									      
## Application Overview :

  ###### GOALS
   1. Allow user to create profile
   2. Enable user to add assets for tracking and also remove assets from tracked list.
   3. Allow user to see the assets tracked.
      
###### CONSTRAINTS
   1. Implement the API for GET, PUT, POST and DELETE requests with appropriate responses
   2. There should be user object with id, first name, last name, email, age, address object (with postal code, street name and house
       number) and assets[] fields.
   3. The assets object should have id, name, symbol etc.
   4. The assets should be an existing asset from [coincap](https://api.coincap.io/v2/assets) api
   5. For user age > 18, first name, last name should be more than 3 characters, email should be with a valid domain and other fields should not be empty.
      
 ###### SOLUTION
      
      API
      
  1. The API part is built using Spring REST API. User, Address, and Asset are the entities of the application.
  2. Servletinitializer and applicationconfig takes care of the appliation configuration part.
  3. Controller defines the various endpoints necessary for the application, which paases request to underlying servie layer and 
       then on to DAO layer. 
  4. Hibernate is used in the application for mapping the objects to the database. MySQL data base is used to store data for various
       entities.
  5. It consist of 3 tables, assets, users and address. Hibernate maps the object to database values based on request.
  6. Custom success and error responses are used to provide feedback to the client side.
  7. hibernate.cfg.xml contains hibernate configuration and pom.xml contains all the neccessary dependencies.
      
          UI
      
  1. Front end is built on **React JS** with **Typescript** for type safety.
  2. For utilizing **web pack** and **babel** facilities, the react app is built using create-react-app
  3. Web application is designed using the **bootstrap** utilizing bootstrap forms, buttons, cards, tabs, modals etc.
  4. **i18next** is for the strings inside the web application.
  5. React router is used for client side routing.
  6. Redux toolkit is used for application wide state manangement.
      
 ###### SETUP
      
   1. [Sql Scripts](https://github.com/mathews-sunny/hahn-applicationprocess-application/tree/master/Scripts/) contains all the sql db scripts
      required to create the database (user_asset_tracker) and tables (users, address, and asset). 
   2. All the files other than front end folder and scripts are related to API. Update url, username and password in the 
      hibernate.cfg.xml file with created DB details.
      
           <property name="connection.url">jdbc:mysql://localhost:3306/user_asset_tracker?useSSL=false&amp;serverTimezone=UTC</property>
           <property name="connection.username">hahnapplication</property>
           <property name="connection.password">7a6B2I51o#e*3</property>
        
   3. Start the application on a server and the endpoints will be exposed!! Thats all with the API part. eg endpoints :
   
          http://localhost:8083/hahn-application/api/users
          http://localhost:8083/hahn-application/api/assets 
        
  4. Open the [front end](https://github.com/mathews-sunny/hahn-applicationprocess-application/tree/master/Front%20End) files in an ide. 
  5. Install all the required packages (redux toolkit, react-bootstrap, react-i18next, react router etc.)
  
          npm install 
          npm install react-bootstrap bootstrap@5.1.3
          npm install react-router-dom
          npm install @reduxjs/toolkit
          npm install i18next react-i18next i18next-browser-languagedetector
              
  6. Setup the proxy url in the package.json to avoid CORS and call the API. If our backend server in Spring is at `http://localhost:8080` and  
        frontend React app running at `http://localhost:3000`, we need frontend server to proxy any requests from `:3000` to `:8080`.
 7. Inorder to overcome CORS issue while request to COINCAP API, we use a proxy server for developemnt purpose, [cors-anywhere](https://cors-anywhere.herokuapp.com/) 
        visit site and request for access.
  8. npm start will start the application on system default browser.
        
   ## Application Walk through
   
   1. Upon page startup, `http://localhost:3000` url is loaded
 ![Welcome Page](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/intro.png?raw=true)
 
  2. If the fields in the two forms (User form and Register form) contain invalid data, those fields which are invalid will be marked in red border. 
   And below those fields appropriate message will be displayed. 
  ![Invalid form](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/invalid%20field.png?raw=true)
  
  3. When the user input any data the form reset button will get enabled. If all the fields are cleared after that, the button will be disaabled.
  ![valid form](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/valid.png?raw=true)
  
  4. If the user try to clear the fields, then a warning dialog is shown to warn about loss of data
  ![clear form](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/clear%20fields.png?raw=true)
  
  5. If all the fields are valid, then only the submit buttons (send and register) will get enabled. Else it will remain disabled. The button enable/disable, field color
   etc are based on the client side validation. All the fields are again reverified in the server, to prevent any malpractises. If upon registering, all fields are valid, 
   save gets executed and a toaster shows status.
   ![valid form](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/user%20created.png?raw=true)
   
  6. If the user try to access the tracked assets with invalid details, the login is hindered with appropriate message box.
  ![Invalid user](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/invalid%20track.png?raw=true)
  
  7. If the user input valid details in user form and on clicking send button, `http://localhost:3000/assets` path is opened (using client side routing).
    ![no assets](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/tracked%20assets%20without%20data.png?raw=true)
    
  8. A user can add tracked asset via two methods : First one is by using the add asset form in the tracked assets tab. Validation is provided for these fields also.
  ![invalid asset](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/invalid%20asset.png?raw=true)
  
  9. After giving valid data in the fields and click send, tracked assets will be updated.
  ![asset added](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/added%20asset.png?raw=true)
  
  10. Second method to add assets is more UI method!! We can make use of the Assets Lists tab which, list all the available assets, by clicking on add button we can add
   assets for tracking
  ![asset list](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/assets%20list.png?raw=true)
  
  11. In tracked assets tab , the remove button or the close button on the assets can be used to remove assets from tracking list. 
    ![remove asset](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/remove.png?raw=true)
    
  12. In the profile tab the user details, can be verified. And it provides a button to go back to main screen and check another user or create more users.
  ![Profile tab](https://github.com/mathews-sunny/hahn-applicationprocess-application/blob/master/application%20screenshots/user%20profile.png?raw=true)
    
  ## Conclusion 
  The asset tracking application built on react and spring could server the users satisfactorily. The backend aids to application efficiency by its swift response on the API
  calls. The client side and server side validation not only help user to make corrections but also safegaurd from some malpractises. 
