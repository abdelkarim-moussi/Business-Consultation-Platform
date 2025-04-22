<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'author_id',
        'title',
        'content',
        'cover',
        'status',
        'category_id'
    ];



    public function Author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
