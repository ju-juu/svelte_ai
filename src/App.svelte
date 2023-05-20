<script>
    import {onMount} from 'svelte';
    import {createHandler} from "./lib/OpenAIHandler.js";

    let ai;
    let question = '';
    let image_prompt = ''
    let response = '';
    let isLoading = false;
    let image = '';

    onMount(() => {
        ai = createHandler('API KEY');
    });

    async function askQuestion() {
        isLoading = true;
        response = await ai.ask(question);
        isLoading = false;
    }

    async function generateImage() {
        isLoading = true;
        image = await ai.image(image_prompt);
        isLoading = false;
    }

</script>

<main>
    <h1>Ask any question.</h1>
    <div class="chat-box">
        <input type="text" bind:value={question} placeholder="Ask a question"/>
        <button on:click={askQuestion} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Ask'}
        </button>
    </div>
    {#if response}
        <div class="response">
            <strong>Response:</strong>
            <p>{response}</p>
        </div>
    {/if}
    <br/>
    <br/>

    <h1>Generate an Image.</h1>
    <div class="image-box">
        <div class="chat-box">
            <input type="text" bind:value={image_prompt} placeholder="Describe the image"/>
            <button on:click={generateImage} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Ask'}
            </button>
        </div>
        {#if image}
            <br/>
            <br/>
            <br/>
            <br/>
            <div class="generated-image">
                <img src={image} alt="Generated Image"/>
            </div>
        {/if}
    </div>


</main>

<style>
    .chat-box {
        margin-top: 1em;
        display: flex;
    }

    .chat-box input {
        flex: 1;
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .chat-box button {
        margin-left: 0.5em;
        padding: 0.5em 1em;
        border: none;
        background-color: #646cff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }

    .response {
        margin-top: 1em;
    }
</style>
