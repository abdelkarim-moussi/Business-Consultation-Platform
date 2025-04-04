<?php

namespace App\Http\Controllers;

use App\Models\Consultant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultantController extends Controller
{
    
    public function index()
    {
        $consultants = DB::table('users')->join('consultants','users.id','consultants.user_id')->get();

        return response()->json(
            [
                'consultants'=>$consultants
            ]
            );
    }
}
