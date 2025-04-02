<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'date',
        'delay',
        'entrepreneur_id',
        'consultant_id'
    ];
}
