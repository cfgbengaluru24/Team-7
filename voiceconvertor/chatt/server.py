from flask import Flask, render_template, jsonify, request
import threading
from vosk import Model, KaldiRecognizer
import pyaudio
import json
from word2number import w2n

app = Flask(_name_)

model_path = r"C:\Users\HARINI N\Desktop\vosk-model-small-en-us-0.15"
model = Model(model_path)
recognizer = KaldiRecognizer(model, 16000)

# List to store recognized data
recognized_data = [None] * 9  # [name, phone_number, blood_group, age, gender, pincode, haemoglobin, oral_health_index, prescription]
field_names = [
    'name', 'phone number', 'blood group', 'age', 'gender', 'pin code', 'haemoglobin', 'oral health index', 'prescription'
]
blood_group_map = {
    'a positive': 'A+',
    'a negative': 'A-',
    'b positive': 'B+',
    'b negative': 'B-',
    'ab positive': 'AB+',
    'ab negative': 'AB-',
    'o positive': 'O+',
    'o negative': 'O-'
}
field_index = None

def convert_sentence_numbers(sentence):
    words = sentence.split()
    converted_words = []
    i = 0
    while i < len(words):
        try:
            if i + 1 < len(words):
                combined_word = words[i] + " " + words[i + 1]
                converted_number = w2n.word_to_num(combined_word)
                converted_words.append(str(converted_number))
                i += 2
            else:
                converted_number = w2n.word_to_num(words[i])
                converted_words.append(str(converted_number))
                i += 1
        except ValueError:
            converted_words.append(words[i])
            i += 1
    return ' '.join(converted_words)

def process_blood_group(text):
    text = text.lower().strip()
    return blood_group_map.get(text, text)

def recognition_thread():
    global field_index
    mic = pyaudio.PyAudio()
    stream = mic.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=1024)
    stream.start_stream()

    try:
        while True:
            data = stream.read(1024, exception_on_overflow=False)
            if recognizer.AcceptWaveform(data):
                result = json.loads(recognizer.Result())
                text = result.get('text', '')  # Extract the recognized text
                if text:
                    text = text.lower().strip()  # Normalize the text
                    print(f"Recognized: '{text}'")
                    if text in field_names:
                        field_index = field_names.index(text)
                        print(f"Please say the {field_names[field_index]}.")
                    elif field_index is not None:
                        converted_text = convert_sentence_numbers(text)  # Convert numbers in the sentence
                        if field_names[field_index] == 'blood group':
                            converted_text = process_blood_group(converted_text)
                        recognized_data[field_index] = converted_text
                        print(f"{field_names[field_index].capitalize()} recorded: '{converted_text}'")
                        field_index = None  # Reset field index after recording
                    elif text == 'stop':
                        print("Stop command recognized. Ending the program.")
                        break
    except KeyboardInterrupt:
        print("Stopping the recognition")
    finally:
        stream.stop_stream()
        stream.close()
        mic.terminate()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_recognition', methods=['POST'])
def start_recognition():
    threading.Thread(target=recognition_thread).start()
    return jsonify({"status": "Recognition started"})

@app.route('/get_data', methods=['GET'])
def get_data():
    return jsonify({"data": recognized_data})

if _name_ == '_main_':
    app.run(debug=True)