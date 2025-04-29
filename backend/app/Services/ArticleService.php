<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Tag;
use App\Repositories\ArticleRepository;
use Exception;
use Illuminate\Support\Facades\DB;
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

        try {
            DB::beginTransaction();
            $validated = $data->validate([
                'author_id' => 'required|exists:users,id',
                'title' => 'required|min:50',
                'content' => 'required|min:100',
                'cover' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
                'category_id' => 'required'
            ]);

            $validated['cover'] = $data->file('cover')->store('covers', 'public');
            $article = JWTAuth::user()->articles()->create($validated);

            if ($data->has('tags')) {
                $tags = [
                    'article_id' => $article->id,
                    'tags' => $data['tags']
                ];

                Tag::create($tags);
            }

            DB::commit();
            return response()->json(
                [
                    'message' => 'article created succefully',
                ],
                200
            );
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Something went wrong!',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function updateArticle($id, $data)
    {


        try {

            $validated = $data->validate([
                'title' => 'required|min:50',
                'content' => 'required|min:100',
                'status' => 'required',
                'cover' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

            if ($data->hasFile('cover')) {
                $path = $data->file('cover')->store('covers', 'public');
                $validated['cover'] = $path;
            }

            if ($data->has('tags')) {
                $tags = [
                    'article_id' => $id,
                    'tags' => $data['tags']
                ];
            }

            return $this->articleRepository->update($id, $validated);
        } catch (Exception $e) {
        }
    }


    public function deleteArticle($id)
    {
        return $this->articleRepository->delete($id);
    }

    public function getConsultantArticles($id)
    {
        return $this->articleRepository->getArticlesForConsultant($id);
    }

    public function getRelatedArticles($category)
    {
        return $this->articleRepository->getByCategory($category);
    }
}
