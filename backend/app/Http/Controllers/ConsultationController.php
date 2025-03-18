<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultationController extends Controller
{
    

    public function index(){

        $consulations = Consultation::all();

        return response()->json(compact('consultations'));
    }

    public function show(Consultation $consulation){

        $consulation = DB::table('consulations')->where('id',$consulation->id)->first();

        return response()->json(compact('consultation'));
    }
}
