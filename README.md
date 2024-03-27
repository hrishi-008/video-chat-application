### Introduction
This is a video chat application built using AgoraRTC for real-time communication, Django for backend development, HTML/CSS for design and styling, and SQL for data storage. The application facilitates video conferencing between multiple users in real-time. Additionally, dynamic Agora token generation is implemented for secure communication.

### Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone https://github.com/hrishi-008/video-chat-application
   ```
2. **Install Dependencies**:
   - Ensure Python and Django are installed on your system.
   - Install required Python packages using pip:
     ```
     pip install -r requirements.txt
     ```
3. **Database Setup**:
   - Configure your SQL database settings in `settings.py`.
   - Run migrations to create necessary tables:
     ```
     python manage.py migrate
     ```
4. **Agora Setup**:
   - Obtain AgoraRTC SDK credentials from Agora Console.
   - Update the Agora credentials in the application configuration.

### Usage
1. **Run the Server**:
   ```
   python manage.py runserver
   ```
2. **Access the Application**:
   - Open a web browser and go to `http://localhost:8000` (or the specified address).
   - Sign up for an account or log in if you already have one.
   - Create or join a video chat room.
   - Enjoy seamless video conferencing with other users.

### Future Plans
- **Dependency Removal on AgoraRTC**:
  - Convert the application to use WebRTC for real-time communication.
  - Implement necessary changes to ensure compatibility and functionality.

### Contributors
- [Hrishikesh Kalola](linkedin.com/in/hrishk)

### Feedback and Issues
If you have any feedback or encounter any issues while using the application, please feel free to [submit an issue](https://github.com/video-chat-application/issues) on GitHub.

### License
Mozilla Public License Version 2.0
