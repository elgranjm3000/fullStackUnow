<?php
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ExternalApi
{
    private HttpClientInterface $client;
    private $params;



    public function __construct(HttpClientInterface $client,ParameterBagInterface $params)
    {
        $this->client = $client;
        $this->params = $params;
    }

    public function getDataFromApi(): array
    {
        $url = 'https://ibillboard.com/api/positions';        
        $response = $this->client->request('GET', $url);        
        return $response->toArray();
    }

    public function postEmailToApi(array $data): array
{
    $emailData = $this->params->get('ip_email_server');

    $url = "{$emailData}/emailempleado";    
    $response = $this->client->request('POST', $url, [
        'json' => $data        
    ]);   
    
    return $response->toArray();
}
}
