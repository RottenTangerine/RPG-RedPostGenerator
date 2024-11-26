import json
import time
import os
import base64
from CallGPT import call_gpt_model
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许跨域请求
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app) # Serve React static files
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route("/api/receipts", methods=['POST'])
def process_receipts():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        file_content = file.read()
        base64_encoded_data = base64.b64encode(file_content).decode('utf-8')
        result = call_gpt_model(base64_encoded_data)

        return jsonify({'message': json.loads(result)})
    return jsonify({'error': 'File upload failed'}), 500


if __name__ == '__main__':
    app.run(debug=True)
