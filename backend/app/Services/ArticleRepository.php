<?php

namespace App\Repositories;

use App\Models\Article;
use App\Models\Category;
use App\Repositories\Interfaces\ArticleRepositoryInterface;

class ArticleRepository implements ArticleRepositoryInterface
{

    public function all()
    {
        return Article::all();
    }

    public function find($id)
    {
        return Category::findOrFail($id);
    }

    public function create($data)
    {
        return Category::create($data);
    }

    public function update($id, $data)
    {
        return Category::findOrFail($id)->update($data);
    }
    public function delete($id)
    {
        return Category::delete($id);
    }
}
