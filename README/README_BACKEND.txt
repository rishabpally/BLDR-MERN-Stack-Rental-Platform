Rental Platform Backend - API Testing Guide (PowerShell)
This document provides step-by-step instructions for testing the Rental Platform API using PowerShell commands.

Prerequisites
Backend Server:

Ensure the backend server is running:
powershell
 
 
node server.js
MongoDB Connection:

Ensure MongoDB is running locally (mongodb://localhost:27017/rentalPlatform).
Testing API Endpoints
1. List an Item
Endpoint: POST /api/rentals/list
Description: Add a new item to the database.
PowerShell Command:
powershell
 
 
Invoke-WebRequest -Uri "http://localhost:3000/api/rentals/list" -Method POST `
  -Body '{"name":"Camera","description":"High-quality DSLR camera","pricePerDay":50}' `
  -ContentType "application/json"
Expected Output:
json
 
 
{
  "message": "Item listed successfully!",
  "item": {
    "_id": "unique-id",
    "name": "Camera",
    "description": "High-quality DSLR camera",
    "pricePerDay": 50,
    "available": true,
    "rentals": []
  }
}
2. Search for Items
Endpoint: GET /api/rentals/search
Description: Retrieve items filtered by name, price range, or both.
PowerShell Command:
powershell
 
 
Invoke-WebRequest -Uri "http://localhost:3000/api/rentals/search?name=Camera&minPrice=10&maxPrice=100" `
  -Method GET
Expected Output:
json
 
 
[
  {
    "_id": "unique-id",
    "name": "Camera",
    "description": "High-quality DSLR camera",
    "pricePerDay": 50,
    "available": true,
    "rentals": []
  }
]
3. Rent an Item
Endpoint: PATCH /api/rentals/rent/:id
Description: Mark an item as rented by providing a date range.
PowerShell Command:
powershell
 
 
Invoke-WebRequest -Uri "http://localhost:3000/api/rentals/rent/<item-id>" -Method PATCH `
  -Body '{"startDate":"2025-01-01","endDate":"2025-01-05"}' `
  -ContentType "application/json"
Replace <item-id> with the unique ID of the item.
Expected Output:
json
 
 
{
  "message": "Item rented successfully!",
  "item": {
    "_id": "unique-id",
    "name": "Camera",
    "description": "High-quality DSLR camera",
    "pricePerDay": 50,
    "available": true,
    "rentals": [
      {
        "startDate": "2025-01-01T00:00:00.000Z",
        "endDate": "2025-01-05T00:00:00.000Z"
      }
    ]
  }
}
4. Return an Item
Endpoint: PATCH /api/rentals/return/:id
Description: Mark an item as returned and clear its rental history.
PowerShell Command:
powershell
 
 
Invoke-WebRequest -Uri "http://localhost:3000/api/rentals/return/<item-id>" -Method PATCH
Replace <item-id> with the unique ID of the item.
Expected Output:
json
 
 
{
  "message": "Item returned successfully!",
  "item": {
    "_id": "unique-id",
    "name": "Camera",
    "description": "High-quality DSLR camera",
    "pricePerDay": 50,
    "available": true,
    "rentals": []
  }
}