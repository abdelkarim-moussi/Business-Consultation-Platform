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

        $consultation = $this->consultationService->createConsultation($request);

        return response()->json(
            [
                'message'=>'consultation created succefully',
                'consultation'=>$consultation
            ],200);

    }

    public function update($id,Request $request){
        
       $consultation = $this->consultationService->updateConsultation($id,$request);
       return response()->json(
        [
            'message'=>'consultation updated succefully',
            'consultation'=>$consultation
        ]
        );

    }
    
    public function cancel($id){

       return $this->consultationService->cancelConsultation($id);
    }
    public function accept($id){

       return $this->consultationService->acceptConsultation($id);
    }
    public function refuse($id){

       return $this->consultationService->refuseConsultation($id);
    }

}
