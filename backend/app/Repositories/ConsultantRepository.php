<?php
namespace App\Repositories\ConsultantRepository;

use Illuminate\Support\Facades\DB;

class ConsultantRepository
{

    public function getAll(){

    $consultants = DB::table('users')->join('consultants','users.id','consultants.user_id')->get();

    }
}