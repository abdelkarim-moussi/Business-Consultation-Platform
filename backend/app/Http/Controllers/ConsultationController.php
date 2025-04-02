<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Services\ConsultationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultationController extends Controller
{
    private $consultationService;
    
    public function __construct(ConsultationService $consultationService)
    {
        $this->consultationService = $consultationService;
    }

    public function index(){

        $consultations = $this->consultationService->getAllConsultations();

        return response()->json(compact('consultations'));

    }


    public function show($id){

        $consulation = $this->consultationService->getConsultationById($id);
        
        return response()->json(compact('consultation'));
    }

    public function store(Request $request){

        $consulation = $this->consultationService->createConsultation($request);

        return response()->json(compact('consultation'));

    }
}
