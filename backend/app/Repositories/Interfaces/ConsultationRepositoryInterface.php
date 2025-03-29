<?php
namespace App\Repositories\Interfaces;

interface ConsultationRepositoryInterface
{

    public function all();
    public function find($id);
    public function create(object $data);
    public function update($id,object $data);
    public function delete($id);
    
}