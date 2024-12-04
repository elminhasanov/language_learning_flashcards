from flask import Flask, request, jsonify
from googletrans import Translator

app = Flask(__name__)
translator = Translator()
flashcards = []

@app.route("/translate", methods=["POST"])
def translate_word():
    data = request.json
    word = data["word"]
    target_language = data["targetLanguage"]
    translation = translator.translate(word, dest=target_language).text
    card = {
        "native": word,
        "translation": translation,
        "language": target_language,
    }
    flashcards.append(card)
    return jsonify(card)

@app.route("/flashcards", methods=["GET"])
def get_flashcards():
    return jsonify(flashcards)

if __name__ == "__main__":
    app.run(debug=True)
