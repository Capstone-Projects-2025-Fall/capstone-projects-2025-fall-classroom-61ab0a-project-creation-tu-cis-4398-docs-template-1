---
sidebar_position: 1
---

# System Overview

## Project Abstract
This API allows developers to more easily connect their games to audio-to-text programs, allowing them to control the game with an AAC input. On playback the API will run an audio-to-text program and check if the produced text matches possible inputs in the connected game and execute them.
## Conceptual Design
The API will process audio outputs from AAC devices, translate them into game commands, and communicate those commands with games that are built in JavaScript. The API will use Node.js and Python for audio processing and machine learning. The API is modular, as developers can design audio-controlled games wihout handling AAC board input and enable in-game actions. 

## Background
The AAC API will be implemented by game developers looking to support voice input, specifically from the devices of AAC users. The API will access the system microphone, perform speech-to-text, and then return input to the game logic. Developers can define the words that the API will recognize.

Currently, there are a few AAC tools and assitive systems that support communication and accesibility with AAC devices, such as Microsoft's Xbox Adapative Controller, which is a controller desgined to offer creative input methods for those who are disabled and other software that uses eye-tracking as inputs with users with congnitive or physical disabilityes, but none use the AAC devices to act as game controllers, and more specifially with audio inputs. 
