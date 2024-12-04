<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface; 
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Doctrine\ORM\EntityManagerInterface;

class AuthController extends AbstractController
{
    private $jwtManager;
    private $passwordHasher;  
    private $entityManager;

    public function __construct(JWTTokenManagerInterface $jwtManager, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager)
    {
        $this->jwtManager = $jwtManager;
        $this->passwordHasher = $passwordHasher;  
        $this->entityManager = $entityManager;
    }

    #[Route("/login", name:"login", methods:["POST"])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['username']) || !isset($data['password'])) {
            return new JsonResponse(['message' => 'Faltan las credenciales'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $data['username']]);
        if (!$user) {
            return new JsonResponse(['message' => 'Usuario no encontrado'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        if (!$this->passwordHasher->isPasswordValid($user, $data['password'])) {  
            return new JsonResponse(['message' => 'Credenciales inválidas'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        $token = $this->jwtManager->create($user);
        return new JsonResponse(['token' => $token]);
    }
}
