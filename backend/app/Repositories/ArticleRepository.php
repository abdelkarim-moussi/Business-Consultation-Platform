<?php

namespace App\Repositories;

use App\Models\Article;
use App\Models\Category;
use App\Repositories\Interfaces\ArticleRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ArticleRepository implements ArticleRepositoryInterface
{

    public function all()
    {
        $articles = Article::with(['author', 'tags', 'category', 'comments', 'comments.user'])->get();

        $articles->map(function ($article) {
            $article->cover = asset('storage/' . $article->cover);
            if ($article->author->photo && !str_contains($article->author->photo, '/storage/')) {
                $article->author->photo = asset('storage/' . $article->author->photo);
            }
            return $article;
        });

        return $articles;
    }

    public function find($id)
    {
        $article = Article::with(['author', 'tags', 'category', 'comments', 'comments.user', 'comments.replies'])->findOrFail($id);

        $article->author->photo = asset('/storage/' . $article->author->photo);

        $article->cover = asset('/storage/' . $article->cover);

        $article->comments->map(function ($comment) {
            if ($comment->user->photo && !str_contains($comment->user->photo, '/storage/')) {
                $comment->user->photo = asset('storage/' . $comment->user->photo);
            }
            return $comment;
        });


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

    public function getByCategory($category)
    {
        $articles = DB::table('articles')
            ->join('categories', 'articles.category_id', 'categories.id')
            ->where('categories.name', $category)->get();

        $articles->map(function ($article) {
            $article->cover = asset('storage/' . $article->cover);
            return $article;
        });

        return $articles;
    }
}
