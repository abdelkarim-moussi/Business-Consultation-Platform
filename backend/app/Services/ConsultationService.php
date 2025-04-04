<?php
namespace App\Services;

use App\Repositories\ConsultationRepository;
use Illuminate\Support\Facades\Gate;

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
                'date'=>'required|date_format:"Y-m-d H:i"',
                'delay'=>'required',
                'entrepreneur_id'=>'required|exists:entrepreneurs,id',
                'consultant_id'=>'required|exists:consultants,id'
            ]
            );
        
           
        return $this->consultationRepository->create($validated);

    }

    public function updateConsultation($id,object $data)
    {
        $validated = $data->validate(
            [
                'date'=>'required|date_format:"Y-m-d H:i"',
                'delay'=>'required'
            ]
        );

        return $this->consultationRepository->update($id,$validated);
    }

    public function cancelConsult($id)
    {
        return $this->consultationRepository->cancel($id);
    }
}