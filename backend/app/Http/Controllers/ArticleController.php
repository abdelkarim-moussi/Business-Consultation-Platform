<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    protected ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index()
    {

        $articles = $this->articleService->getAllArticles();

        return response()->json(['articles' => $articles], 200);
    }

    public function show($id)
    {
        $article = $this->articleService->getArticleById($id);
        return response()->json(compact('article'));
    }

    public function store(Request $request)
    {

        $article = $this->articleService->createArticle($request);
        dd($article);
        return response()->json(
            [
                'message' => 'article created succefully'
            ]
        );
    }

    public function update($id, Request $request)
    {

        return $this->articleService->updateArticle($id, $request);
    }

    public function destroy($id)
    {
        return $this->articleService->deleteArticle($id);
    }


    public function forConsultant($consultantId)
    {
        $articles = $this->articleService->getConsultantArticles($consultantId);

        return response()->json([
            'data' => $articles
        ]);
    }

    public function RelatedArticles($category)
    {
        $articles = $this->articleService->getRelatedArticles($category);
        return response()->json([
            'articles' => $articles
        ]);
    }
}
