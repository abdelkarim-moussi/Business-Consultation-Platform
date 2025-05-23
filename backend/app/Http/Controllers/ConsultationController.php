<?php

namespace App\Http\Controllers;

use App\Models\Entrepreneur;
use App\Models\User;
use App\Services\ConsultationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Tymon\JWTAuth\Facades\JWTAuth;

class ConsultationController extends Controller
{
    private $consultationService;

    public function __construct(ConsultationService $consultationService)
    {
        $this->consultationService = $consultationService;
    }

    public function index()
    {

        $consultations = $this->consultationService->getAllConsultations();

        return response()->json(compact('consultations'));
    }


    public function show($id)
    {

        $consultation = $this->consultationService->getConsultationById($id);

        return response()->json(compact('consultation'));
    }

    public function store(Request $request)
    {

        $consultation = $this->consultationService->createConsultation($request);

        return response()->json(
            [
                'message' => 'consultation created succefully',
                'consultation' => $consultation
            ],
            200
        );
    }

    public function update($id, Request $request)
    {

        $consultation = $this->consultationService->updateConsultation($id, $request);
        return response()->json(
            [
                'message' => 'consultation updated succefully',
                'consultation' => $consultation
            ]
        );
    }

    public function findConsultationsByConsultantId($id)
    {
        
        $user = User::findOrFail($id);

        if (! Gate::allows('viewConsultConsultations', $user)) {
            abort(403, "you are not allowed");
        }

        $consultations = $this->consultationService->getConsultationsByConsultantId($id);

        return response()->json([
            'consultations' => $consultations
        ]);
    }


    public function findConsultationsByEntrepreneurId($id)
    {
        $user = User::findOrFail($id);

        if (!Gate::allows('viewEntrepreneurConsultations', $user)) {
            abort(403, "you are not allowed");
        }

        $consultations = $this->consultationService->getConsultationsByEntrepreneurId($id);

        return response()->json([
            'consultations' => $consultations
        ]);
    }


    public function ManageConsultationStatus($id, Request $request)
    {
        $this->consultationService->changeConsultationStatus($id, $request);

        return response()->json(
            [
                'message' => 'consultation ' . $request->status . ' succefully'
            ]
        );
    }


    public function cancel($id)
    {

        return $this->consultationService->cancelConsultation($id);
    }

    public function accept($id)
    {

        return $this->consultationService->acceptConsultation($id);
    }

    public function refuse($id)
    {

        return $this->consultationService->refuseConsultation($id);
    }
}
