<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'cover',
        'content'
    ];



    public function Author()
    {
        return $this->belongsTo(User::class);
    }
}
