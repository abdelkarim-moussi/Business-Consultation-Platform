<?php

use App\Http\Controllers\JWTAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register',[JWTAuthController::class,'register']);
Route::post('login',[JWTAuthController::class,'login']);
Route::middleware(['jwtauth'])->group(function(){
    Route::get('user',[JWTAuthController::class,'getUser']);
    Route::post('logout',[JWTAuthController::class,'logout']);
});