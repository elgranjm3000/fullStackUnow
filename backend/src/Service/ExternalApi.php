<?php
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class ExternalApi
{
    private HttpClientInterface $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function getDataFromApi(): array
    {
        $url = 'https://ibillboard.com/api/positions';        
        $response = $this->client->request('GET', $url);        
        return $response->toArray();
    }

    public function postEmailToApi(array $data): array
{
    $url = 'http://172.19.0.6:8082/emailempleado';    
    $response = $this->client->request('POST', $url, [
        'json' => $data        
    ]);   
    
    return $response->toArray();
}
}
