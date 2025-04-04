<?php

namespace App\Http\Controllers;

use App\Models\Consultant;
use App\Services\ConsultantService\ConsultantService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultantController extends Controller
{
    protected $consultantService;

    public function __construct(ConsultantService $consultantService)
    {
        $this->consultantService = $consultantService;
    }
    
    public function index()
    {
        $consultants = DB::table('users')->join('consultants','users.id','consultants.user_id')->get();

        return response()->json(
            [
                'consultants'=>$consultants
            ]
            );
    }

    public function view($id){

    }
}
