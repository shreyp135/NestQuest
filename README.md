
 # NestQuest - Accommodation booking and listing platform for the underrated places.
<br>

<p align="center">
<a href="https://nestquest-ipoo.onrender.com/listings">
<img src="https://res.cloudinary.com/dahhchuj8/image/upload/v1716811345/Screenshot_2024-05-27_171708-modified_qpespx.png" height="300px" alt="NestQuest-logo"/>
</a>
 <br>
List your home as a Nest or book a Nest for your comfortable stay.

</p>

<h4> The NestQuest project aims to develop a web-based accommodation booking platform inspired by the popular
service AirBnB. This project sets itself apart by focusing on undiscovered, underrated places that cater to urban
needs.
</h4>

## Features and Interfaces

1. Landing Page - Listings <br>
   - The landing page of the NestQuest website shows all the available listings
   - ![image](https://res.cloudinary.com/dahhchuj8/image/upload/v1716811700/Screenshot_2024-05-27_173808_dclzil.png)
 <br><br>
   - It is dynamic and automatically changes layout based on the number of listings 
   - ![image](https://res.cloudinary.com/dahhchuj8/image/upload/v1716814449/Screenshot_2024-05-27_182354_hpx8vr.png)
   
 <br><br>
2. Listings <br>
   - Each listing has an image and all the necessary info on the property.
   - ![image](https://res.cloudinary.com/dahhchuj8/image/upload/v1716814638/Screenshot_2024-05-27_182704_mgbbzy.png)
    <br><br>
   - It also shows on the map(mapbox api) where the property is listed and also if there are any reviews or ratings. 
   - ![image](https://res.cloudinary.com/dahhchuj8/image/upload/v1716814763/Screenshot_2024-05-27_182747_eppqwz.png)
    <br>
   - There is also authorization for who can or cannot write a review or edit the listing.
    <br><br>
3. Create a new listing <br>
   - You can only create a new listing by logging in.
   - ![image](https://res.cloudinary.com/dahhchuj8/image/upload/v1716814841/Screenshot_2024-05-27_183029_cpsoh1.png)
        <br><br>

   - After logging in we can create a new listing by filling all the details. 
   - ![image](https://res.cloudinary.com/dahhchuj8/image/upload/v1716816853/Screenshot_2024-05-27_190255_elyezy.png)
    <br><br>

4. Give Review <br>
   - Logged in users can give review and ratings to the listing. 
   - ![image](https://res.cloudinary.com/dahhchuj8/image/upload/v1716816961/Screenshot_2024-05-27_190509_jvttni.png)
    <br><br>


## Tech stack

#### Frontend
- HTML, EJS, CSS
- Bootstrap
#### Backend
- Nodejs
- Express
- MongoDB
- Javascript
#### Other
- Mapbox api
- cloudinary

## Features

- Property Listings
- User Authentication
- Reviews and Ratings
- Mapview feature using mapbox api.

## Points to keep in mind while testing the app

1. Be patient as the  website is running on a free server with limited bandwidth so it can be a little slow at first.
2. In case the page is not reloading, it is probably due to server overload, **REFRESH** the window to solve this.
3. if it is showing server not acceessible then add you ip address to mongo atlas configuration in the dashboard.
4. Make sure the **URL** is starting with https.

## Instructions


1. `git clone https://github.com/shreyp135/NestQuest` 
2. `cd Nestquest`
3. Install node dependencies 
   - `npm install`
4. Create a `.env` file 
   - Add relevant credentials
5. Replace cloudinary and mapbox API keys with your configurations
6. add the mongo atlas url 
5. Run the server by `node app.js` or `nodemon app.js`
6. The app is now running at http://localhost:8080
7. If there is some issue the website can be directly be accessed at https://nestquest-ipoo.onrender.com/listings

## Future Ideas or Implementations

1. add the searchbox backend functionality
2. make the ui more responsive on different sizes
3. add current location feature
4. Integrate AI (cause that's the basic need nowadays ;) )
5. Endless number of features :)

## Need help?

Feel free to contact me on [LinkedIn](https://www.linkedin.com/in/shreyanshpaliwal135/) <br>
or email me at shreyanshpaliwalcmsmn@gmail.com


---------                             
