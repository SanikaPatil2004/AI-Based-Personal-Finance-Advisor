# from flask import Flask , render_template ,request,jsonify
# from flask_cors import CORS
# import os
# from chat import get_response


# app=Flask(__name__)
# CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for testing


# @app.get("/")
# @app.get("/")
# def index_get():
#     return jsonify({"message": "Flask API is running!"})



# @app.post("/predict")
# def predict():
#     text=request.get_json().get("message")

#     response=get_response(text)
#     message = {"answer":response}
#     return jsonify(message)

# if __name__ == "__main__":
#     # app.run(debug=True)
#     # app.run(port=5001, debug=True)
#       if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))  # Get PORT from Render
#     app.run(host="0.0.0.0", port=port, debug=True)

#     #app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5001)))

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from chat import get_response

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask server running!"})

@app.route("/predict", methods=["POST"])
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    return jsonify({"answer": response})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


