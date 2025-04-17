<?php

namespace App\Services;

use App\Repositories\ArticleRepository;
use Tymon\JWTAuth\Facades\JWTAuth;

class ArticleService
{

    protected ArticleRepository $articleRepository;


    public function getAllArticles()
    {

        return $this->articleRepository->all();
    }

    public function getArticleById($id)
    {
        return $this->articleRepository->find($id);
    }

    public function createArticle($data)
    {

        $validated = $data->validate([
            'title' => 'required|min:10',
            'contect' => 'required|min:100',
            'cover' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $path = $data->file('cover')->store('covers', 'public');

        $article = JWTAuth::user()->posts()->create($validated);

        return response()->json(
            [
                'message' => 'article created succefully',
            ],
            200
        );
    }
}
