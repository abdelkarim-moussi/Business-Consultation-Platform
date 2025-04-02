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

        $validate = $request->validate(
            [
                'Date'=>'required|datetime',
                'dalay'=>'required|float|min:30',
                'entrepreneur_id'=>'required',
                'consultant_id'=>'required'
            ]
            );

        $consulation = Consultation::create($validate);

        return response()->json(compact('consultation'));

    }
}
