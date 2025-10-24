import speech_recognition as sr
import sys
import io

recognizer = sr.Recognizer()

try:
    # Read full audio file from stdin (bytes)
    audio_bytes = sys.stdin.buffer.read()
    
    # Load audio from bytes (handles WAV, FLAC, AIFF, etc.)
    with sr.AudioFile(io.BytesIO(audio_bytes)) as source:
        audio = recognizer.record(source)
    
    # Recognize speech using Google
    text = recognizer.recognize_google(audio)
    print(text)

except sr.UnknownValueError:
    print("Could not understand audio")
    sys.exit(1)
except sr.RequestError as e:
    print(f"Error: {e}")
    sys.exit(2)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(3)
