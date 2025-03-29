<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultant extends Model
{
    
    protected $fillable = [
        'used_id',
        'experience',
        'domainExpertise'
    ];
    
}
