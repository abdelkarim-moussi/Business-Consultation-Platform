<?php
namespace App\Repositories\ConsultantRepositoryInterface;

interface ConsultantRepositoryInterface
{
    public function getAll();
    public function findById($id);
}