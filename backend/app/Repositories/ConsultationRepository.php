<?php
namespace App\Repositories;

use App\Models\Consultation;
use App\Repositories\Interfaces\ConsultationRepositoryInterface;

class ConsultationRepository implements ConsultationRepositoryInterface
{

    public function all()
    {
        return Consultation::all();
    }

    public function find($id)
    {

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