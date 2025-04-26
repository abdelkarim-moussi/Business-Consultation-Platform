<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'note',
        'comment'
    ];


    public function consultant()
    {
        return $this->belongsTo(Consultant::class);
    }
}
