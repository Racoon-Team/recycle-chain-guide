# YourProjects
On the Firebase page of our already created project, when you enter the project, we have two sections on the left side:

- Authentication
- Firestore Database

# Authentication

Here we have all the users authenticated by Google or also in the "create an account" section.

# Firestore Database

# ------------ DATA -------------------
When we enter the Firestore Database, at the top, there is the "Data" section. There we have:

        - Collections
        - Document
        - Field

At the moment, we use two collections:

        - Recycling points
        - Users

# Recycling point collection
We have the data for the recycling points that we registered using the RecycleMap modal:

- A Document is created that is the recycling point ID:

        - 9vmHfNp1onYVoumGnY1R

- The recycling point ID creates Fields:

        - latitude: -17.375710888538595 (number)

        - natural gas: -66.16406679153444 (number)

        - name: "Calle Félix del Granado" (string)

        - registerBy: "Gustavo Bautista Arce" (string)

        - type: "Glass, Hard Plastic" (string)

        - url: "" (string)

# collection users
We have the authenticated user's data, which allows us to obtain user information when we want to change our first name, last name, and email address.

- A Document is created that is the user ID:

        - 0G8LoKHyO7Mlx3YlmTWRBs3H8zC2

- The user's point ID creates Fields:

        - Email: "erika@gmail.com" (string)

        - First name: "erika" (string)

        - Last name: "Carla" (string)

You ask, "Where is the password?" Firebase stores passwords internally, encrypted, and we only use functions like updatePassword to change them.

# ------------- RULES ------------------
We have a Firebase Firestore security rule. These rules control who can read or write to your Firestore database.

# OUR RULE FOR THE WEB SYSTEM
# -------------------------------------------------------------------------------
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
      match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
        match /recyclingPoints/{document=**} {
          allow read, write: if true;
        }
      }
    }
# -------------------------------------------------------------------------------

- ​​Rules for documents in the "users" collection

match /users/{userId} {
    allow read, write: if request.auth != null && request.auth.uid == userId;
}

- Rules for any document in the "recyclingPoints" collection

match /recyclingPoints/{document=**} {
    allow read, write: if true;
}