**Payment Web Application Readme**

Welcome to our Payment Web Application, a basic platform developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application serves as a learning project to understand the fundamentals of building web applications with payment transaction features. It utilizes Mongoose sessions for handling payment transactions, and it's important to note that the transactions in this application are simulated and do not involve real money transfers.

### Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory.

   ```bash
   cd Basic-payment-app
   ```

3. Install dependencies for both the server and the client.

   ```bash
   cd ./backend
   npm install
   cd ./frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and provide the necessary environment variables. An example `.env` file is provided in the `backend` directory.

5. Start the server.

   ```bash
   cd ../server
   npm start
   ```

6. Start the client.

   ```bash
   cd ../client
   npm start
   ```

7. The application should now be running locally. Access it by navigating to `http://localhost:3000` in your web browser.

### Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Payment Transactions**: Users can perform payment transactions between accounts. These transactions are simulated and do not involve real money.
- **Dashboard**: Users have a dashboard where they can view their account balance and transaction history.

### Technologies Used

- **MongoDB**: NoSQL database used for storing user account information and transaction data.
- **Express.js**: Web application framework for building the server-side of the application.
- **React.js**: JavaScript library for building the user interface of the application.
- **Node.js**: JavaScript runtime used for building the server-side of the application.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js, used for interacting with MongoDB in an asynchronous environment.

### Future Improvements

this is only the learning project.I definitely build the evolution version of this.

### Contributors

- [Karan Sharma](https://github.com/walkerbuddy01)
  
### Acknowledgements

We would like to thank [Harkirat/chai aur code] for providing guidance and resources for developing this application.
