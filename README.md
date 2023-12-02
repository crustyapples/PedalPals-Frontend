# PedalPals

<p align='center'>
<img width="600" alt="image" src="https://github.com/crustyapples/PedalPals-Backend/assets/24990448/32bbe678-3cea-49a8-81a6-967c4e56680a">
</p>

<p align="center">
    <a href="https://github.com/crustyapples/PedalPals-Frontend">Frontend</a>
    |
    <a href="https://github.com/crustyapples/PedalPals-Backend">Backend</a>
    |
    <a href="https://youtu.be/yYxC69_shPs">Demo Video</a>
</p>

# PedalPals-Frontend

This is the frontend repository for PedalPals. Built with React Native, Expo Go, Typescript, TailwindCSS

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

