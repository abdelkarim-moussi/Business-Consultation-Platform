<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Comment extends Pivot
{

    protected $fillable = [
        'content',
        'article_id',
        'user_id',
        'parent_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
