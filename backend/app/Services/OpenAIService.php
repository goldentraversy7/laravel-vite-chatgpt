<?php

namespace App\Services;

use GuzzleHttp\Client;

class OpenAIService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('app.openai_api_key');
    }

    public function generateChatResponse($prompt)
    {
        $response = $this->client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo', // Change to 'gpt-4' if you have access
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
