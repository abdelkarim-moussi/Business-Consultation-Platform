<?php

namespace App\Repositories;

use App\Models\Article;
use App\Models\Category;
use App\Repositories\Interfaces\ArticleRepositoryInterface;

class ArticleRepository implements ArticleRepositoryInterface
{

    public function all()
    {
        $articles = Article::with('author', 'tags')->get();

        $articles->map(function ($article) {
            $article->cover = asset('storage/' . $article->cover);
            return $article;
        });

        return $articles;
    }

    public function find($id)
    {
        $article = Article::with(['author', 'tags'])->findOrFail($id);

        $article->author->photo = asset('/storage/' . $article->author->photo);
  
        $article->cover = asset('/storage/' . $article->cover);

        return $article;
    }

    public function create($data)
    {
        return Article::create($data);
    }

    public function update($id, $data)
    {
        $article = Article::findOrFail($id);

        $article->update($data);


        return response()->json(
            [
                'message' => 'article updated succefully'
            ]
        );
    }
    public function delete($id)
    {

        Article::findOrFail($id)->delete();

        return response()->json([
            'message' => 'article deleted succefully'
        ]);
    }


    public function getArticlesForConsultant($id)
    {
        return Article::with(['author', 'category', 'tags'])
            ->where('author_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
