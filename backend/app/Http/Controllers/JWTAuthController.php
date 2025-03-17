<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTAuthController extends Controller
{
    
    public function register(Request $request){

        $validated = $request->validate(
            [
                'firstName'=>'required|string|max:255',
                'lastName'=>'required|string|max:255',
                'email'=>'required|email|max:255',
                'accountType'=>'required|string',
                'password'=>'required|confirmed'
            ]
            );

            $user = User::create($validated);

            $token = JWTAuth::fromUser($user);

            return response()->json(compact('user','token'),201);

    }
}
