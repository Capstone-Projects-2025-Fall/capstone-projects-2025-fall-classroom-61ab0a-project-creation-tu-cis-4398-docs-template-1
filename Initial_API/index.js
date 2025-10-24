/**
 * Author: Kieran Plenn
 * Date: 10/03/2025
 * Description: This is a basic initialization of an API. Instructions were followed from this
 *              video: https://www.youtube.com/watch?v=-MTSQjw5DrM
 * 
 * Note: Key 'bug' fix was to make sure the app.listen() function was not deleted. 
 * 
 * Run: Make sure you're in the Initial_API directory. Enter 'node .' into the terminal to start
 *      the API. Check http://localhost:8080 for success.
 * 
 * Last Edit (10/10/2025): Changed code to allow for unit testing with Jest
 * 
 * Update by Andrew Blass:
 * - added new post function for uploading audio file and recieving back a message
 * - new tests added to confirm responses for when file is and isnt attached to the request
 * - audio processing to translate speech to text still needed
 */

const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 8080;

const storage = multer.memoryStorage();
const upload = multer({ storage });
const { spawn } = require('child_process');
const path = require('path');

// Middleware to parse JSON
app.use(express.json());

// GET
app.get('/test', (req, res) => {
    res.status(200).send({
        name: 'Test1',
        status: 'test'
    });
});

// POST
app.post('/test/:id', (req, res) => {
    const { id } = req.params;
    const { info } = req.body;

    if (!info) {
        return res.status(418).send({ message: 'No info!' });
    }

    res.send({
        name: `Test message with info: ${info} and ID: ${id}`,
    });
});

app.post('/upload', upload.single("audioFile"), async (req, res) => {
    if(!req.file){
        return res.status(418).send({message: 'No audio file uploaded'});
    }
    
    const audioBuffer = req.file.buffer;
    
    try {
        // Call Python script
        const python = spawn(process.platform === "win32" ? "python" : "python3", [
            path.join(__dirname, 'speech2.py')
        ]);
        
        // Send audio data to Python script via stdin
        python.stdin.write(audioBuffer);
        python.stdin.end();
        
        let result = '';
        let error = '';
        
        // Collect output
        python.stdout.on('data', (data) => {
            result += data.toString();
        });
        
        python.stderr.on('data', (data) => {
            error += data.toString();
        });
        
        // Wait for completion
        python.on('close', (code) => {
            if (code !== 0) {
                return res.status(300).send({
                    pyCode: code,
                    message: 'Audio processing failed',
                    error: error
                });
            }
            
            res.status(200).send({
                message: 'Audio processed successfully',
                transcription: result.trim(),
                filename: req.file.originalname,
                size: req.file.size + ' bytes'
            });
        });
        
    } catch (error) {
        res.status(500).send({
            message: 'Error processing audio',
            error: error.message
        });
    }
});

// Only start server if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
}

// Export app for testing
module.exports = app;