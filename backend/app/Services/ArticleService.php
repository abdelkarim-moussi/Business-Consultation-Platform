<?php
namespace App\Services;

use App\Repositories\ArticleRepository;

class ArticleService
{

    protected ArticleRepository $articleRepository;


    public function getAllArticles(){

        return $this->articleRepository->all();
    }


}