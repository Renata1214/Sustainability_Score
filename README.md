# Hack Princeton Project

Welcome to Hack Princeton! This project is designed for the hackathon, and this guide will walk you through setting up your project, configuring your environment, and running the server. Let's get started!

---

## Prerequisites

Before beginning, make sure you have the following installed:

- **Node.js and npm:** npm (Node Package Manager) is bundled with Node.js.
- **ngrok:** Used for creating a public URL for your local server.

### Installing Node.js and npm

1. **Download and Install:**
   - Visit the [Node.js website](https://nodejs.org/) and download the LTS (Long Term Support) version for your operating system.
   - Run the installer and follow the instructions to complete the installation.

2. **Verify Installation:**
   - Open your terminal or command prompt.
   - Run these commands:
     ```
     node -v
     npm -v
     ```
   - You should see version numbers for both Node.js and npm.

### Installing ngrok

1. Visit the [ngrok website](https://ngrok.com/) and download ngrok for your operating system.
2. Follow the installation instructions provided on the site.

---

## Project Setup

### 1. Install Project Dependencies

1. Open your terminal.
2. Navigate to your project directory:
   ```
   cd path/to/your/project-directory
   ```
Install the necessary packages:

```
npm install
```
3. Configure the Server
Obtain Credentials:

Get your Client ID and Secret from Kieran or Olav.

Update the Server Code:

Open the file server.js in your code editor.

Locate lines 12 and 13.

Replace the placeholders with your Client ID and Secret.

Running the Server
To start the server, run:

```
npm run start
```
Your server should now be running locally on port 3000.

Setting Up Your Webhook
To receive transactions, you need a webhook URL that is allowlisted. Follow these steps:

4. Create a Public URL with ngrok
In your terminal, run:

```
ngrok http 3000
```
ngrok will generate a public URL that tunnels to your local server.

Share this URL with Kieran or Olav to get it allowlisted.

Using the Application
Initialize the SDK
Open your web browser and navigate to:

```
http://localhost:3000/init-sdk
```
Log in using the following credentials:

Username: user_good_transactions

Password: pass_good

View Transactions
Visit:

```
http://localhost:3000/transactions
```
to view your transactions.

Check Total Spending
Go to:

```
http://localhost:3000/finance
```
to see the total spend.

Try changing the merchant on viws/init-sdk.ejs
Change the id from 45 to xyz for netflix to abc for spotify for abd for uber fyz for hotels

Trouble shooting
If you need to clear the database
```
sqlite3 transactions.db
DROP TABLE IF EXISTS transactions;
```

Now restart the server by killing the server and rerunning 
```
npm run start
```

Your data should be cleared and the database schema reset.

How do I change what merchant I am connecting to?
Update the merchant id on the init-sdk
```
Merchant ids:
84: airbnb
78: american airlines
45: walmart
44: amazon
40: instacart
36: uber eats
19: doordash
13: spotify
12: target
10: uber
```

Need Help?
If you run into any issues or have questions, feel free to ask for assistance. Enjoy hacking and have fun at Hack Princeton!