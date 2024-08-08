# MMS Sending Application

This project allows you to send MMS messages using Twilio. Users can enter their name, email, and phone number to send an MMS message with a specified media URL.

## Getting Started

These instructions will guide you on how to run and test the project on your local machine.

### Prerequisites

- Node.js
- Twilio Account
- Twilio Account SID and Auth Token

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/username/mms-project.git
    cd mms-project
    ```

2. Install the necessary packages:
    ```bash
    npm install
    ```

3. Open `server.js` and add your Twilio account information:
    ```javascript
    const accountSid = 'YOUR_ACCOUNT_SID'; // Paste your SID here
    const authToken = 'YOUR_AUTH_TOKEN'; // Paste your Auth Token here
    ```

4. Start the server:
    ```bash
    node server.js
    ```

5. Open your browser and go to `http://localhost:3000`.

### Usage

1. Enter your name, email, and phone number. Ensure the phone number is in international format (e.g., starting with +1 for the USA, +90 for Turkey).
2. Click the submit button.
3. An MMS will be sent to the entered phone number.

### Information

- Enter the phone number in international format (+ country code).
- Use a valid and accessible media URL.

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
