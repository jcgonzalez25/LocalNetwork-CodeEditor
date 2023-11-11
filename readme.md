<h1 align="center">🚀 LocalNetwork-CodeEditor 🌐</h1>

<p align="center">
  <strong>Collaborative Code Editing Made Easy</strong>
</p>

## Overview
LocalNetwork-CodeEditor is a collaborative code editing tool that allows multiple users to edit code together in real-time over a local network. It leverages the power of Ace Editor and WebSockets to provide a seamless collaborative coding experience.

## Getting Started 🛠️
Follow these simple steps to set up and run Live Editor On Local Network on your local network:

1. **Clone the Repository**: 📦
   ```sh
   git clone [repository_url]
   cd live-class-editor
   ```

2. **Install Dependencies**: 📚
   ```sh
   npm install
   ```

3. **Configure Client**: ⚙️
   Open the `config.js` file in the `client` directory and set the `LOCAL_SERVER_IP` variable to the IP address of your local computer. This configuration is necessary for WebSocket communication.

   ```javascript
   const LOCAL_SERVER_IP = "YOUR_LOCAL_IP_ADDRESS";
   ```

4. **Start WebSocket Server**: 🚀
   ```sh
   npm start
   ```

5. **Collaborate in Real-Time**: 👥
   Open the `index.html` file in a web browser, or have others on your local network visit the IP address where you are hosting the web page. Enjoy seamless real-time collaboration with your team or peers.

## Usage 🖋️
- Use your favorite code editor to make changes to the code.
- Changes made by any user will be immediately reflected in the editor of all connected users.
- Cursors indicating the positions of collaborators will be displayed on the editor.
- Enjoy seamless real-time collaboration with your team or peers.

## Notes 📝
- If you are using Visual Studio Code, you can use the "golive" extension to quickly set up the Live Editor On Local Network.
- By serving the `index.html` file, anyone on your local network can access and collaborate on the code in real-time.

## Contributing 🤝
Contributions are welcome! If you would like to contribute to this project, please follow these guidelines:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and ensure that the code is properly formatted.
- Submit a pull request with a clear description of your changes.

## License 📄
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact 📧
If you have any questions or need further assistance, feel free to contact us at [your_email@example.com](mailto:your_email@example.com).

<p align="center">Happy coding! 🚀</p>
