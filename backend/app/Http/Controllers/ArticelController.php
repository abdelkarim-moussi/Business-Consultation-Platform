<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Illuminate\Http\Request;

class ArticelController extends Controller
{
    protected ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }



    public function index()
    {

        $articles = $this->articleService->getAllArticles();

        return response()->json(compact('articles'), 200);
    }

    public function view($id)
    {

        $article = $this->articleService->getArticleById($id);
        return response()->json(compact('article'));
    }

    public function create(Request $request)
    {

        return $this->articleService->createArticle($request);
    }

    public function update($id, Request $request)
    {

        return $this->articleService->updateArticle($id, $request);
    }

    public function delete($id)
    {
        return $this->articleService->deleteArticle($id);
    }
}
