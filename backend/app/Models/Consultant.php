<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultant extends Model
{

    protected $fillable = [
        'user_id',
        'experience',
        'domainExpertise',
        'tags'
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
