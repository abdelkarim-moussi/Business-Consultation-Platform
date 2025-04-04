<?php
namespace App\Services\ConsultantService;

use App\Repositories\ConsultantRepository\ConsultantRepository;

class ConsultantService
{
    protected $consultantRepository;

    public function __construct(ConsultantRepository $consultantRepository)
    {
        $this->consultantRepository = $consultantRepository;
    }

    public function getAllConsultants()
    {
        return $this->consultantRepository->getAll();
    }

    public function findConsultantById($id)
    {
        return $this->consultantRepository->findById($id);
    }
}