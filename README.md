
### Setup 

1. Clone the repository or download the project to your local machine.

2. Navigate to the project's front-end directory:

    ```sh
    cd pp-fe
    ```

3. Install the required npm packages:

    ```sh
    npm install
    ```

4. Create a `.env` file in the root of the `pp-fe` directory and add the following content:

    ```
    EXPO_PUBLIC_BACKEND_API_URL="FLASK_SERVER_IP"
    ```

    Replace `FLASK_SERVER_IP` with the actual IP address or domain of your Flask server.

5. Start the Expo development server:

    ```sh
    npx expo start
    ```

    This will start the Expo development server and you can open the project in a web browser, on an Android emulator, or on an iOS simulator.

