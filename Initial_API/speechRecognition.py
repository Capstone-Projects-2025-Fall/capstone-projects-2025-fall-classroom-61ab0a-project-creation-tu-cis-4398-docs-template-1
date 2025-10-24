# pip install SpeechRecognition pyaudio

import speech_recognition as sr

recognizer = sr.Recognizer() # Create a recognizer instance

def record_audio(duration):
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Adjusting for ambient noise...")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        recognizer.energy_threshold = 200
        print(f"Recording for {duration} seconds...")
        audio = recognizer.record(source, duration=duration)
        print("Recording finished!")

    return audio


DURATION = 5 # 5 seconds

audioSpeech = record_audio(DURATION) # To hold the audio file being transcribed

# Attempt to transcribe the recorded audio
try:
    text = recognizer.recognize_google(audioSpeech) # Using Google's speech recognition
    print(f"You said: {text}")
except sr.UnknownValueError:
    print("Could not understand audio")
except sr.RequestError as e:
    print(f"Error: {e}")
   







