<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disponibility extends Model
{
    protected $fillable = [
        'consultant_id',
        'date',
        'startTime',
        'endTime',
    ];
}
