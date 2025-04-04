<?php
namespace App\Repositories\Interfaces;

interface ConsultationRepositoryInterface
{

    public function all();
    public function find($id);
    public function create($data);
    public function update($id,$data);
    public function cancel($id);
    public function accept($id);
    public function refuse($id);
    public function delete($id);
    
}