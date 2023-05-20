class OpenAI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async ask(question) {
        return await this.fetchChatResponse(question);
    }

    async image(prompt){
        return await this.fetchImage(prompt)
    }

    async fetchChatResponse(question) {
        const endpoint = 'https://api.openai.com/v1/chat/completions';

        try {
            console.log("Requesting")
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {role: 'system', content: 'You are a helpful assistant.'}, // the
                        {role: 'user', content: question},
                    ],
                    temperature: 0.7,
                }),
            });
            if (response.ok) {

                const data = await response.json();
                console.log(data)
                return data.choices[0].message.content.trim();
            } else {
                console.error('Failed to get a response from OpenAI:', response.status, response.statusText);
                return 'Sorry, an error occurred while fetching the response.';
            }
        } catch (error) {
            console.error('Failed to get a response from OpenAI:', error);
            return 'Sorry, an error occurred while fetching the response.';
        }
    }


    async fetchImage(prompt) {
        const endpoint = 'https://api.openai.com/v1/images/generations';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    prompt: prompt,
                    n: 1,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data['data'][0]['url'])

                return data['data'][0]['url'];
            } else {
                console.error('Failed to generate an image:', response.status, response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Failed to generate an image:', error);
            return null;
        }
    }
}

export function createHandler(apiKey) {
    return new OpenAI(apiKey);
}
