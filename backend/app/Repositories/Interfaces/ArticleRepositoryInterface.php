<?php
namespace App\Repositories\Interfaces;


interface ArticleRepositoryInterface
{
    public function all();
    public function find($id);
    public function create($data);
    public function update($id,$data);
}