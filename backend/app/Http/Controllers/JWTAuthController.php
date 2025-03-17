<?php

namespace App\Http\Controllers;

use App\Models\User;
use Doctrine\Common\Lexer\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
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

    public function login(Request $request){

        $credentials = $request->only('email','password');

        try{

            if(! $token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'error'=>'invalid credentials'
                ]);
            }

        $user = Auth::user();

        $token = JWTAuth::claims(['accountType'=>$user->accountType])->fromUser($user);

        return response()->json(compact('user','token'));

        }catch(JWTException $e){

            return response()->json(['error'=>'could not create token'],500);
        }
        
    }
}
