This project generates movie recommendations for you using AI.

## How it works

This project uses the [ChatGPT API](https://openai.com/api/) and [Vercel Edge functions](https://vercel.com/features/edge-functions) with streaming. It constructs a prompt based on the form and user input, sends it to the chatGPT API via a Vercel Edge function, then streams the response back to the application.

## Running Locally

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```