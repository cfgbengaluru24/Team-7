from vosk import Model, KaldiRecognizer
import pyaudio
import json
from word2number import w2n

# Initialize the model and recognizer
model_path = r"C:\Users\mukhi\Desktop\jpmc-cfg-main-project\voiceconvertor\vosk-model-en-in-0.5"
model = Model(model_path)
recognizer = KaldiRecognizer(model, 16000)
print("Please say 'name' to input the name, 'phone number' to input the phone number, 'blood group' to input the blood group, 'age' to input the age, 'gender' to input the gender, 'pincode' to input the pincode, 'haemoglobin' to input the haemoglobin, 'oral health index' to input the oral health index, 'prescription' to input the prescription. Say 'stop' to end the recognition.")

# Initialize PyAudio
mic = pyaudio.PyAudio()
stream = mic.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=1024)
stream.start_stream()

# List to store recognized data
recognized_data = [None] * 9  # [name, phone_number, blood_group, age, gender, pincode, haemoglobin, oral_health_index, prescription]

# Field names in the order they are asked
field_names = [
    'name', 'phone number', 'blood group', 'age', 'gender', 'pin code', 'haemoglobin', 'oral health index', 'prescription'
]

# Blood group conversion map
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
    # Clean and convert blood group text
    text = text.lower().strip()
    return blood_group_map.get(text, text)

field_index = None  # Track which field is being recorded

try:
    while True:
        try:
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
        except OSError as e:
            print(f"Stream error: {e}")
except KeyboardInterrupt:
    print("Stopping the recognition")
finally:
    # Stop and close the audio stream
    try:
        stream.stop_stream()
        stream.close()
    except OSError as e:
        print(f"Error closing stream: {e}")
    mic.terminate()

# Output the collected data as an array
print("Collected information:", recognized_data)
# return recognized_data