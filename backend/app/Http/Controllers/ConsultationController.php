<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultationController extends Controller
{
    

    public function index(){

        $consultations = Consultation::all();

        return response()->json(compact('consultations'));
    }

    public function show(Consultation $consulation){

        $consulation = DB::table('consulations')->where('id',$consulation->id)->first();

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
