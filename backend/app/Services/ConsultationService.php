<?php

namespace App\Services;

use App\Repositories\ConsultationRepository;
use Illuminate\Http\Request;
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

    public function createConsultation($data)
    {

        $validated = $data->validate(
            [
                'date' => 'required|date_format:Y-m-d\TH:i',
                'delay' => 'required',
                'consultation_reason' => 'required|min:50',
                'entrepreneur_id' => 'required|exists:entrepreneurs,user_id',
                'consultant_id' => 'required|exists:consultants,id'
            ]
        );


        return $this->consultationRepository->create($validated);
    }

    public function updateConsultation($id, object $data)
    {
        $validated = $data->validate(
            [
                'date' => 'required|date_format:"d-m-y H:i"',
                'delay' => 'required'
            ]
        );

        return $this->consultationRepository->update($id, $validated);
    }

    public function getConsultationsByConsultantId($id)
    {
        return $this->consultationRepository->findConsultationsByConsultantBy($id);
    }
    public function getConsultationsByEntrepreneurId($id)
    {
        return $this->consultationRepository->findConsultationsByEntrepreneurBy($id);
    }

    public function changeConsultationStatus($id, Request $data)
    {
        $validated = $data->validate(
            [
                'status' => 'required|in:accepted,refused,cancel,in_progress,done'
            ]
        );

        return $this->consultationRepository->changeStatus($id, $validated);
    }


    public function cancelConsultation($id)
    {
        return $this->consultationRepository->cancel($id);
    }

    public function acceptConsultation($id)
    {
        return $this->consultationRepository->accept($id);
    }

    public function refuseConsultation($id)
    {
        return $this->consultationRepository->refuse($id);
    }
}
