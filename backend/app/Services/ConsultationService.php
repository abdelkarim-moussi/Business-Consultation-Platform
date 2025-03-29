<?php
namespace App\Services;

use App\Repositories\ConsultationRepository;

class ConsultationService
{
    protected $consultationRepository;

    public function __construct(ConsultationRepository $consultationRepository)
    {
        $this->consultationRepository = $consultationRepository;
    }
    public function getAllConsultations()
    {
        return $this->consultationRepository->all();
    }
}