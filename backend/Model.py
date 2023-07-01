from transformers import pipeline


class Model:
    def __init__(self):
        self.model = None
        self.check_point = None

    def load_model(self, check_point):
        self.check_point
        try:
            self.check_point = check_point
            self.model = pipeline("question-answering", model=self.check_point)
        except:
            return False
        return True

    def inference(self, question, context):
        return self.model(question, context)
