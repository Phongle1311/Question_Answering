from Model import Model
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


model = Model()
model.load_model("PhongLe1311/bert-finetuned-squad-2")


@app.route("/api/question-answering", methods=["POST", "GET"])
def question_answering():
    global model

    if request.method == "POST":
        try:
            data = request.get_json()
            context = data.get("context")
            question = data.get("question")

            if context is None or question is None:
                return jsonify(
                    {"status": "Data must have 'context' and 'question' fields"}
                )

            json_output = model.inference(question=question, context=context)
            json_output["status"] = "success"
            return json_output

        except Exception as e:
            return jsonify({"status": "Error processing the request", "error": str(e)})

    else:
        json_output = model.inference(
            context="My name is Wolfgang and I live in Berlin",
            question="Where do I live?",
        )
        json_output["status"] = "success"
        return json_output


if __name__ == "__main__":
    app.run()
