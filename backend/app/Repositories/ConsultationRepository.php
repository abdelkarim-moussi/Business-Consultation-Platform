<?php
namespace App\Repositories;

use App\Models\Consultation;
use App\Repositories\Interfaces\ConsultationRepositoryInterface;
use Illuminate\Support\Facades\Gate;

class ConsultationRepository implements ConsultationRepositoryInterface
{

    public function all()
    {
        if(Gate::denies('view')){
            abort(403,'you don\'t have access');
        }

        return Consultation::all();
    }

    public function find($id)
    {
        if(Gate::denies('view')){
            abort(403,'you can\'t view this consultation');
        }

        return Consultation::find($id);
    }

    public function create(object $data)
    {

    }

    public function update($id,object $data)
    {

    }

    public function delete($id)
    {

    }

}