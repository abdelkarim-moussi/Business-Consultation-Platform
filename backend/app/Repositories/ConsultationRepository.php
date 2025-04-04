<?php
namespace App\Repositories;

use App\Models\Consultant;
use App\Models\Consultation;
use App\Repositories\Interfaces\ConsultationRepositoryInterface;
use Illuminate\Console\Application;
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
            abort(403,'you don\'t have the rights to make a consultation');
        }

        $consultation = Consultation::find($data['entrepreneur_id']);

            if($data['date'] <= now()){

                abort(403,'choose a valide date and time');
    
                if($consultation && $consultation->date != $data['date']){
                    abort(403,'already have consultation with this consultant at the same time');
                }
        }
        
        
        return Consultation::create($data);

    }

    public function update($id,object $data)
    {
        $consultation = Consultation::find($id);

        if(Gate::denies('update',$consultation)){
            abort(403,'you can not update this consultation');
        }

       return $consultation->update($data);

    }

    public function delete($id)
    {

    }

}