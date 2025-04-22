<?php

namespace App\Services;

use App\Models\Article;
use App\Repositories\ArticleRepository;
use Tymon\JWTAuth\Facades\JWTAuth;

class ArticleService
{

    protected ArticleRepository $articleRepository;

    public function __construct(ArticleRepository $articleRepository)
    {
        $this->articleRepository = $articleRepository;
    }


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
            'author_id' => 'required|exists:users,id',
            'title' => 'required|min:10',
            'content' => 'required|min:100',
            'cover' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'category_id' => 'required'
        ]);

        $validated['path'] = $data->file('cover')->store('covers', 'public');

        JWTAuth::user()->articles()->create($validated);

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
            'content' => 'required|min:100',
            'status' => 'required',
            'cover' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($data->hasFile('cover')) {
            $path = $data->file('cover')->store('covers', 'public');
            $validated['cover'] = $path;
        }

        return $this->articleRepository->update($id, $validated);
    }


    public function deleteArticle($id)
    {
        return $this->articleRepository->delete($id);
    }

    public function getConsultantArticles($id)
    {
        return $this->articleRepository->getArticlesForConsultant($id);
    }
}
