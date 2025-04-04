<?php
namespace App\Repositories\ConsultantRepository;

use App\Repositories\ConsultantRepositoryInterface\ConsultantRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ConsultantRepository implements ConsultantRepositoryInterface
{

    public function getAll(){

    return  DB::table('users')->join('consultants','users.id','consultants.user_id')->get();

    }
}