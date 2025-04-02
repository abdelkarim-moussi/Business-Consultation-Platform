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

    public function getConsultationById($id)
    {
        return $this->consultationRepository->find($id);
    }

    public function createConsultation($data){

        $validated = $data->validate(
            [
                'Date'=>'required|datetime',
                'dalay'=>'required|float|min:30',
                'entrepreneur_id'=>'required',
                'consultant_id'=>'required'
            ]
            );

        return $this->consultationRepository->create($data);
        
    }
}