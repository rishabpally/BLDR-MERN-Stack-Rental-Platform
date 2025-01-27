Rental Platform Frontend - Setup and Usage Guide
This document provides clear instructions for setting up, running, and testing the Rental Platform frontend.

Overview
The frontend is a React-based application that provides a user-friendly interface for interacting with the Rental Platform API. Users can perform the following actions:

List a New Item
Search for Items
Rent an Item
Return an Item
Prerequisites
Node.js: Install the latest version of Node.js from nodejs.org.
Backend Server: Ensure the backend server is running on http://localhost:3000. (Follow the backend README for setup instructions.)
Setup Instructions
1. Clone the Repository
Navigate to your desired folder and clone the frontend repository:

powershell
 
 
git clone <frontend-repo-url>
2. Navigate to the Frontend Folder
powershell
 
 
cd rental-platform-frontend
3. Install Dependencies
Run the following command to install all required dependencies:

powershell
 
 
npm install
4. Start the Frontend Server
Run the following command to start the development server:

powershell
 
 
npm start
The application will be accessible at http://localhost:3005 by default. If port 3005 is in use, you can specify another port:

powershell
 
 
set PORT=3006 && npm start
Frontend Features
1. Home Page
The landing page provides navigation links to all features:

List a New Item: Navigate to the page for adding a new item to the rental platform.
Search for Items: Navigate to the page for searching and viewing available items.
Rent an Item: Navigate to the page for renting available items.
Return an Item: Navigate to the page for returning rented items.
2. List a New Item
Path: /list-item
Purpose: Allows users to add a new item to the database.

Steps:
Fill in the fields:
Name
Description
Price Per Day
Click List Item.
3. Search for Items
Path: /search-items
Purpose: Displays all available items in a table format.

Features:
View item details such as:
Product ID
Name
Description
Price Per Day
Availability
Rentals (if applicable)
Filter items by name or price range using the search bar.
4. Rent an Item
Path: /rent-item
Purpose: Allows users to rent an available item.

Steps:
View the list of all items.
Click Select to Rent next to the desired item.
Provide the rental start and end dates using the date picker.
Confirm the rental.
5. Return an Item
Path: /return-item
Purpose: Allows users to return an item they rented.

Steps:
View the list of rented items.
Click Return next to the desired item.
