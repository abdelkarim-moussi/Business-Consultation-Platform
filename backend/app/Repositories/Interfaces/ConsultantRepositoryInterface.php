<?php
namespace App\Repositories\Interfaces;

interface ConsultantRepositoryInterface
{
    public function getAll();
    public function findById($id);
}