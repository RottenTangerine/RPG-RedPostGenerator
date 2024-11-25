import time
import os
import base64
from CallGPT import call_gpt_model
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许跨域请求


@app.route("/receipts", methods=['POST'])
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
        return jsonify({'message': result})
    return jsonify({'message': 'File upload failed'}), 500


if __name__ == '__main__':
    app.run(debug=True)
