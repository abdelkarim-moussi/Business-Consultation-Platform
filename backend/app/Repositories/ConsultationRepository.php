<?php
namespace App\Repositories;

use App\Models\Consultant;
use App\Models\Consultation;
use App\Repositories\Interfaces\ConsultationRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Console\Application;
use Illuminate\Support\Facades\Gate;

use function PHPUnit\Framework\returnCallback;

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

    public function update($id,$data)
    {
        $consultation = Consultation::find($id);

        if(Gate::denies('update',$consultation)){
            abort(403,'you can not update this consultation');
        }

        if(Carbon::parse($data['date'])->lessThanOrEqualTo(Carbon::parse($consultation->date)->addDay()) ){
            abort(403,'the new date must be greater then the consultation actual date');
        }
        
       return $consultation->update($data);

    }

    public function cancel($id)
    {
        $consultation = Consultation::find($id);

        if(Gate::denies('cancel',$consultation))
        {
            abort(403,'you don\'t have permission for this action');
        }

        if($consultation->status != 'pending' || $consultation->status === 'cancel')
        {
            abort(403,'you can not cancel this consultation because it\'s has been '.$consultation->status);
        }

        $consultation->status = 'cancel';
        $consultation->save();

        return response()->json(
            [
                'message'=>'your consultation has been canceled succefully'
            ]
            );

    }

    public function accept($id)
    {
        $consultation = Consultation::find($id);

        if(Gate::denies('acceptRefuse',$consultation))
        {
            abort(403,'you don\'t have permission for this action');
        }

        if($consultation->status != 'pending')
        {
            abort(403,'you can not accept this consultation because it\'s has been '.$consultation->status);
        }

        $consultation->status = 'accepted';
        $consultation->save();

        return response()->json(
            [
                'message'=>'consultation has been accepted succefully'
            ]
            );

    }

    public function refuse($id)
    {

        $consultation = Consultation::find($id);

        if(Gate::denies('acceptRefuse',$consultation))
        {
            abort(403,'you don\'t have permission for this action');
        }

        if($consultation->status != 'pending')
        {
            abort(403,'you can not accept this consultation because it\'s has been '.$consultation->status);
        }

        $consultation->status = 'refused';
        $consultation->save();

        return response()->json(
            [
                'message'=>'consultation has been refused succefully'
            ]
            );
    }

    public function delete($id)
    {

    }

}