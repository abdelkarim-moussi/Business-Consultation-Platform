<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConsultantController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\DisponibilityController;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

Route::apiResource('consultants', ConsultantController::class);

Route::get('/articles', [ArticleController::class, 'index']);

Route::middleware(['jwtauth'])->group(function () {

    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);

    Route::apiResource('consultations', ConsultationController::class);

    Route::post('consultations/{id}/cancel', [ConsultationController::class, 'cancel']);
    Route::post('consultations/{id}/accept', [ConsultationController::class, 'accept']);
    Route::post('consultations/{id}/refuse', [ConsultationController::class, 'refuse']);

    Route::post('consultations/{id}/statuschange', [ConsultationController::class, 'ManageConsultationStatus']);

    Route::get('consultations/consultant/{id}', [ConsultationController::class, 'findConsultationsByConsultantId']);
    Route::get('consultations/entrepreneur/{id}', [ConsultationController::class, 'findConsultationsByEntrepreneurId']);


    Route::apiResource('articles', ArticleController::class)->except('index', 'show');
    Route::apiResource('comments', CommentController::class)->except('index', 'show');

    Route::get('/consultants/{id}/articles', [ArticleController::class, 'forConsultant']);

    Route::get('/entrepreneurs/{id}/stats', [StatisticsController::class, 'entrepreneurStats']);

    Route::get('/consultants/{id}/stats', [StatisticsController::class, 'consultantStats']);

    Route::apiResource('/profile', ProfileController::class);

    Route::post('updatephoto', [ProfileController::class, 'updatePhoto']);

    Route::put('resetpassword', [JWTAuthController::class, 'resetPassword']);

    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('disponibilities', DisponibilityController::class);
    Route::get('disponibilities/consultant/{id}', [DisponibilityController::class, 'consultantDisponibilities']);
    //admin routes
    Route::get('stats/admin', [StatisticsController::class, 'adminStats']);
    Route::get('users/admin', [UserController::class, 'index']);
    Route::put('users/{id}/verify', [UserController::class, 'verify']);
    Route::put('users/{id}/status', [UserController::class, 'manageUserStatus']);


    //chat routes
    Route::get('/messages/{user}', [ChatController::class, 'index']);
    Route::post('/messages/{user}', [ChatController::class, 'store']);
    Route::get('/users', [ChatController::class, 'viewUsers']);
    Route::get('/user/{user}', [ChatController::class, 'user']);

    //broadcast channel
    Broadcast::channel('chat.{id}', function ($user, $id) {
        return (int) $user->id === (int) $id;
    });
});

Route::apiResource('categories', CategoryController::class);


Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/category/{category}', [ArticleController::class, 'RelatedArticles']);
Route::get('articles/{id}', [ArticleController::class, 'show']);

Route::get('comments', [CommentController::class, 'index']);
