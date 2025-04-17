<?php

namespace App\Services;

use App\Models\Article;
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

        $validated['path'] = $data->file('cover')->store('covers', 'public');

        JWTAuth::user()->posts()->create($validated);

        return response()->json(
            [
                'message' => 'article created succefully',
            ],
            200
        );
    }

    public function updateArticle($id, $data)
    {

        $validated = $data->validate([
            'title' => 'required|min:10',
            'contect' => 'required|min:100',
            'cover' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $article = Article::findOrFail($id);

        if($data->hasFile('cover')){
            $path = $data->file('cover')->store('covers', 'public');
            $validated['cover'] = $path;
        }

        return $this->articleRepository->update($id,$validated);
        
    }


    public function deleteArticle($id)
    {
        return $article = $this->articleRepository->delete($id);
    }
}
