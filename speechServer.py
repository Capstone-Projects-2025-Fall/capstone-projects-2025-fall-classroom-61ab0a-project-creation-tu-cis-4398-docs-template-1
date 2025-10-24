# pip install SpeechRecognition pyaudio
# pip install Flask
# pip install Flask-Cors

import speech_recognition as sr
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

recognizer = sr.Recognizer()

# Record the audio from the microphone
def record_audio(duration):
    "Record audio from the microphone for a given duration in seconds."
    with sr.microphone() as source:
        print("Adjusting for ambient noise...")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        recognizer.energy_threshold = 200
        print(f"Recording for {duration} seconds...")
        audio = recognizer.record(source, duration=duration)
        print("Recording finished!")
    return audio

# Transcribe audio data to text
def transribe_audio(audio):
    "Transcribe audio data to text using Google's speech recognition."
    try:
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return "Could not understand audio"
    except sr.RequestError as e:
        return f"Error: {e}"

# The REST API endpoint to handle audio transcription

@app.route('/api/record', methods=['POST'])
def record_and_transcribe():
    # Record audio from server's microphone and transcribe it
    data = request.get_json()
    duration = data.get('duration', 5)  # Default to 5 seconds if not provided

    try:
        audio = record_audio(duration)
        result = transribe_audio(audio)
        return jsonify({"transcription": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Transcribe the uploaded audio file
@app.route('/api/transcribe', methods=['POST'])
def transribe_uploaded_audio():
    # Transcribe audio data sent in the request
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']

    try:
        with sr.AudioFIle(audio_file) as source:
            audio = recognizer.record(source)
            result = transribe_audio(audio)
            return jsonify({"transcription": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Speech recognition server is running"}), 200

if __name__ == '__main__':
    print("Starting the speech recognition server...")
    print("Available endpoints:")
    print("GET / - Health check")
    print("POST /api/record - Record audio from microphone and transcribe")
    print("POST /api/transcribe - Transcribe uploaded audio file")
    app.run(host='0.0.0.0', port =5000, debug=True)

