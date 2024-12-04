<?php

namespace App\Controller;

use App\Entity\Empleado;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use App\Service\ExternalApi;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;



class EmpleadoController extends AbstractController
{
    private ExternalApi $externalApi;
    private $params;

    public function __construct(ExternalApi $externalApi,ParameterBagInterface $params)
    {
        $this->externalApi = $externalApi;
        $this->params = $params;

    }
    
     #[Route("/api/empleado", name:"register_empleado", methods:["POST"])]
     
    public function register(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $empleado = new Empleado();
        $empleado->setNombre($data['nombre']);
        $empleado->setApellido($data['apellido']);
        $empleado->setCargo($data['puesto']);
        $empleado->setemail($data['email']);
        $empleado->setNacimiento(new \DateTime($data['fechaNacimiento']));

        $entityManager->persist($empleado);
        $entityManager->flush();

        $empleadoData = [
            'id' => $empleado->getId(),
            'nombre' => $empleado->getNombre(),
            'apellido' => $empleado->getApellido(),
            'puesto' => $empleado->getCargo(),
            'fechaNacimiento' => $empleado->getNacimiento()->format('Y-m-d'),
            'email'=>$empleado->getEmail()
        ];        
        $nombre = $empleado->getNombre(). " ".$empleado->getApellido();

        $data = [
            "name"=>$nombre,
            "email"=>$empleado->getEmail()
        ];
        $this->externalApi->postEmailToApi($data);

        return new JsonResponse(['message' => 'Empleado registrado con éxito','data'=>$empleadoData], JsonResponse::HTTP_CREATED);
    }


    #[Route("/api/cargos", name:"cargos", methods:["GET"])]
    
    public function cargos(): JsonResponse{


        $data = $this->externalApi->getDataFromApi();  
        return new JsonResponse(['data'=>$data], JsonResponse::HTTP_CREATED); 
    }



    
    #[Route("/api/empleado/{id?}", name:"view_empleado", methods:["GET"])]
    public function view(EntityManagerInterface $entityManager, int $id = null): JsonResponse
    {
        if ($id === null) {
            $empleados = $entityManager->getRepository(Empleado::class)->findAll();

            $result = array_map(function ($empleado) {
                return [
                    'id' => $empleado->getId(),
                    'nombre' => $empleado->getNombre(),
                    'apellido' => $empleado->getApellido(),
                    'puesto' => $empleado->getCargo(),
                    'fechaNacimiento' => $empleado->getNacimiento()->format('Y-m-d'),
                    'email'=>$empleado->getEmail()
                ];
            }, $empleados);

            return new JsonResponse($result);
        }

        $empleado = $entityManager->getRepository(Empleado::class)->find($id);

        if (!$empleado) {
            return new JsonResponse(['error' => 'Empleado no encontrado'], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            'id' => $empleado->getId(),
            'nombre' => $empleado->getNombre(),
            'apellido' => $empleado->getApellido(),
            'puesto' => $empleado->getCargo(),
            'fechaNacimiento' => $empleado->getNacimiento()->format('Y-m-d'),
            'email'=>$empleado->getEmail()
        ]);
    }

    #[Route("/api/empleado/{id}", name:"edit_empleado", methods:["PUT"])]
    public function edit(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $empleado = $entityManager->getRepository(Empleado::class)->find($id);

        if (!$empleado) {
            return new JsonResponse(['error' => 'Empleado no encontrado'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        if (isset($data['nombre'])) {
            $empleado->setNombre($data['nombre']);
        }
        if (isset($data['apellido'])) {
            $empleado->setApellido($data['apellido']);
        }
        if (isset($data['puesto'])) {
            $empleado->setCargo($data['puesto']);
        }
        if (isset($data['fechaNacimiento'])) {
            $empleado->setNacimiento(new \DateTime($data['fechaNacimiento']));
        }

        if (isset($data['email'])) {
            $empleado->setEmail($data['email']);
        }

        $entityManager->flush();

        $empleadoData = [
            'id' => $empleado->getId(),
            'nombre' => $empleado->getNombre(),
            'apellido' => $empleado->getApellido(),
            'puesto' => $empleado->getCargo(),
            'fechaNacimiento' => $empleado->getNacimiento()->format('Y-m-d'),
            'email' => $empleado->getEmail(),

        ];

        return new JsonResponse(['message' => 'Empleado actualizado con éxito','data'=>$empleadoData]);
    }

    #[Route("/api/empleado/{id}", name:"delete_empleado", methods:["DELETE"])]
    public function delete(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $empleado = $entityManager->getRepository(Empleado::class)->find($id);

        if (!$empleado) {
            return new JsonResponse(['error' => 'Empleado no encontrado'], JsonResponse::HTTP_NOT_FOUND);
        }

        $entityManager->remove($empleado);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Empleado eliminado con éxito']);
    }


}