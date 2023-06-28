from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)


class Model:
    def __init__(self):
        self.model = None
        self.check_point = None

    def load_model(self, check_point):
        self.check_point
        try:
            self.model = pipeline("question-answering", model=self.check_point)
        except:
            return False
        return True

    def inference(self, question, context):
        return self.model(question, context)


model = Model()
model.load_model("PhongLe1311/bert-finetuned-squad")


@app.route("/api/question-answering", methods=["POST", "GET"])
def question_answering():
    global model

    if request.method == "POST":
        context = ""
        question = ""
        try:
            data = request.get_json()
            context = data["context"]
            question = data["question"]
        except:
            return {"status": "Data must have content field"}

        json_output = model.inference(question=question, context=context)
        return json_output
    else:
        json_output = model.inference(
            context="My name is Wolfgang and I live in Berlin",
            question="Where do I live?",
        )
        return json_output


if __name__ == "__main__":
    app.run()
