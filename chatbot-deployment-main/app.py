from flask import Flask , render_template ,request,jsonify
from flask_cors import CORS
import os
from chat import get_response


app=Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.get("/")
def index_get():
    return render_template("Dashboard.jsx")


@app.post("/predict")
def predict():
    text=request.get_json().get("message")

    response=get_response(text)
    message = {"answer":response}
    return jsonify(message)

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(port=5001, debug=True)
  
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5001)))



