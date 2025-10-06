# Speech to Text Feature

The Speech to Text feature provides real-time speech recognition capabilities, converting spoken words into text. This is particularly useful for accessibility and hands-free text input in the AAC (Augmentative and Alternative Communication) system.

## Overview

The Speech to Text component uses the Web Speech API to capture audio from the user's microphone and convert it to text in real-time. This feature is essential for users who may have difficulty typing or prefer voice input.

## Features

- **Real-time transcription**: Speech is converted to text as you speak
- **Continuous listening**: Can capture multiple sentences or phrases
- **Browser compatibility**: Works with modern browsers that support Web Speech API
- **Error handling**: Graceful fallback for unsupported browsers
- **Clear functionality**: Easy way to clear the transcript
- **Visual feedback**: Clear indicators for listening status

## How to Use

1. **Start Listening**: Click the "🎤 Start Listening" button to begin speech recognition
2. **Speak**: Speak clearly into your microphone
3. **View Results**: Your speech will appear as text in the transcript area
4. **Stop Listening**: Click "🛑 Stop Listening" when finished
5. **Clear**: Use the "🗑️ Clear" button to remove the current transcript

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full Support | Recommended browser |
| Microsoft Edge | ✅ Full Support | Good compatibility |
| Safari | ⚠️ Limited Support | May have restrictions |
| Firefox | ❌ Not Supported | Web Speech API not available |

## Technical Implementation

### Component Structure

```javascript
// Main component with speech recognition logic
const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  // ... implementation
};
```

### Key Features

- **Speech Recognition API**: Uses `webkitSpeechRecognition` or `SpeechRecognition`
- **Continuous Mode**: Captures ongoing speech without stopping
- **Interim Results**: Shows partial results while speaking
- **Error Handling**: Manages recognition errors gracefully
- **State Management**: Tracks listening status and transcript

### Configuration

```javascript
recognitionRef.current.continuous = true;      // Keep listening
recognitionRef.current.interimResults = true; // Show partial results
recognitionRef.current.lang = 'en-US';        // Set language
```

## Accessibility Features

- **Keyboard Navigation**: All buttons are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Visual Indicators**: Clear status indicators for listening state
- **Error Messages**: Descriptive error messages for troubleshooting

## Use Cases

1. **AAC Communication**: Primary input method for users with motor disabilities
2. **Hands-free Input**: When typing is difficult or impossible
3. **Quick Text Entry**: Fast way to input longer text passages
4. **Accessibility**: Alternative input method for various abilities

## Troubleshooting

### Common Issues

1. **"Speech recognition not supported"**
   - Use a supported browser (Chrome or Edge recommended)
   - Ensure microphone permissions are granted

2. **No audio being captured**
   - Check microphone permissions in browser settings
   - Ensure microphone is not being used by another application

3. **Poor recognition accuracy**
   - Speak clearly and at a moderate pace
   - Reduce background noise
   - Use a good quality microphone

### Browser Permissions

Most browsers will request microphone permission when first using speech recognition. Make sure to:

1. Allow microphone access when prompted
2. Check browser settings if permission was denied
3. Ensure the site is served over HTTPS (required for microphone access)

## Future Enhancements

- **Multiple Language Support**: Add language selection dropdown
- **Voice Commands**: Implement voice commands for navigation
- **Custom Vocabulary**: Add domain-specific vocabulary support
- **Export Functionality**: Save transcripts to files
- **Integration**: Connect with other AAC system components

## Related Documentation

- [API Specification](../api-specification/openapi-spec.md)
- [System Architecture](../system-architecture/design.md)
- [Accessibility Guidelines](../requirements/features-and-requirements.md)
