<?php
namespace App\Repositories;

use App\Models\Consultant;
use App\Repositories\Interfaces\ConsultantRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ConsultantRepository implements ConsultantRepositoryInterface
{

    public function getAll(){

    return  DB::table('users')->join('consultants','users.id','consultants.user_id')->get();

    }

    public function findById($id)
    {
        return Consultant::findOrFail($id);
    }
}