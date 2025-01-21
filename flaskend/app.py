# server.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os
from PIL import Image
import face_recognition

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the React app




# Directory to save images
UPLOAD_FOLDER = 'user_faces'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/save-face', methods=['POST'])
def save_face():
    data = request.json
    user_name = data.get('userName')  # Optional: unique identifier for user
    image_data = data.get('image')

    if not image_data:
        return jsonify({'success': False, 'message': 'No image data provided'}), 400

    try:
        # Decode the base64 image data
        image_data = image_data.split(',')[1]
        img_bytes = base64.b64decode(image_data)

        # Save image file with a unique filename, like user's name or ID
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{user_name}_face.png")
        with open(file_path, 'wb') as f:
            f.write(img_bytes)

        return jsonify({'success': True, 'message': 'Face image saved successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


# Route to verify user face for login
@app.route('/verify-user', methods=['POST'])
def verify_user():
    data = request.json
    image_data = data.get('image')

    # Load the captured image
    captured_face = face_recognition.load_image_file(image_data)
    captured_encoding = face_recognition.face_encodings(captured_face)[0]

    for user_folder in os.listdir('users'):
        known_image_path = os.path.join('users', user_folder, 'face.png')
        known_face = face_recognition.load_image_file(known_image_path)
        known_encoding = face_recognition.face_encodings(known_face)[0]

        # Compare the encodings
        matches = face_recognition.compare_faces([known_encoding], captured_encoding)
        if True in matches:
            return jsonify({"success": True, "username": user_folder}), 200

    return jsonify({"error": "Face not recognized"}), 401

if __name__ == '__main__':
    app.run(debug=True)
