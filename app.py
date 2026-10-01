from flask import Flask, render_template, request, jsonify
from config import RESPONSES

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").lower().strip()
    response = RESPONSES["default"]
    for keyword, answer in RESPONSES.items():
        if keyword != "default" and keyword in message:
            response = answer
            break
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
