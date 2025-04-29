<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{

    use HasFactory, Notifiable;

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'accountType' => $this->accountType
        ];
    }

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'accountType',
        'password',
        'photo'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function entrepreneurConsultations()
    {
        return $this->hasMany(Consultation::class, 'entrepreneur_id');
    }

    public function consultantConsultations()
    {
        return $this->hasMany(Consultation::class, 'consultant_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment   ::class);
    }

    public function articles()
    {
        return $this->hasMany(Article::class, 'author_id');
    }
}
