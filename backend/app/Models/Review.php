<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'reviewer_id',
        'consultant_id',
        'rating',
        'reviewText'
    ];


    public function consultant()
    {
        return $this->belongsTo(Consultant::class);
    }
}
