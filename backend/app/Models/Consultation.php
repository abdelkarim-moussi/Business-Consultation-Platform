<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'date',
        'delay',
        'entrepreneur_id',
        'consultant_id',
        'consultation_reason',
        'status'
    ];


    public function entrepreneur()
    {
        return $this->belongsTo(User::class, 'entrepreneur_id');
    }

    public function consultant()
    {
        return $this->belongsTo(User::class, 'consultant_id');
    }
}
