<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConsultantController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\StatisticsController;
use Illuminate\Support\Facades\Route;

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

Route::apiResource('consultants', ConsultantController::class);

Route::middleware(['jwtauth'])->group(function () {

    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);

    Route::apiResource('consultations', ConsultationController::class);

    Route::post('consultations/{id}/cancel', [ConsultationController::class, 'cancel']);
    Route::post('consultations/{id}/accept', [ConsultationController::class, 'accept']);
    Route::post('consultations/{id}/refuse', [ConsultationController::class, 'refuse']);

    Route::apiResource('articles', ArticleController::class)->except('index', 'view');
    Route::apiResource('comments', CommentController::class)->except('index', 'view');

    Route::get('/stats/platform', [StatisticsController::class, 'platformOverview']);

    Route::get('/consultants/{id}/articles', [ArticleController::class, 'forConsultant']);

    Route::get('/entrepreneurs/{id}/stats', [StatisticsController::class, 'entrepreneurStats']);


    Route::get('/consultants/{id}/stats', [StatisticsController::class, 'consultantStats']);
});

Route::apiResource('categories', CategoryController::class);
