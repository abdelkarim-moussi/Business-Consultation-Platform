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

    public function create($data)
    {
        if(Gate::denies('create',Consultation::class)){
            abort(403,'you don\'t have the rights to make a consulation');
        }

        $consultation = Consultation::find($data['entrepreneur_id']);

        if($consultation && $consultation->consultant_id = $data['consultant_id']){
            return response()->json(
                [
                    'message'=>'already have consultation with this consultant'
                ]
                );
        }
        return Consultation::create($data);

    }

    public function update($id,object $data)
    {

    }

    public function delete($id)
    {

    }

}