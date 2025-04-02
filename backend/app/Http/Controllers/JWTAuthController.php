<?php

namespace App\Http\Controllers;

use App\Models\Consultant;
use App\Models\Entrepreneur;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

            try{

            DB::beginTransaction();

            $validated['password'] = bcrypt($validated['password']);

            $user = User::create($validated);

            $token = JWTAuth::fromUser($user);

            if($user->accountType === 'entrepreneur'){
                Entrepreneur::create(
                    [
                        'user_id'=>$user->id
                    ]
                    );
            }
            else if($user->accountType === 'consultant'){
                Consultant::create([
                    'user_id'=>$user->id
                ]);
            }

            DB::commit();

            return response()->json(compact('user','token'),201);

            }catch(\Exception $e){
    
                DB::rollBack();
                report($e);

                return response()->json([
                    'message' => 'Registration failed. Please try again.',
                    'error'   => $e->getMessage()
                ], 500);
                
            }

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

    public function getUser(){

        try{
            if(! $user = JWTAuth::parseToken()->authenticate()){
                return response()->json([
                    'error'=>'user not found'
                ], 404);
            }

        }catch(JWTException){
            return response()->json([
                'error'=>'invalid token'
            ], 404);
        }

        return response()->json(compact('user'));
    }

    public function logout(){

        if(! JWTAuth::invalidate(JWTAuth::getToken())){
            return response()->json(
                [
                    'error'=>'error logging out'
                ]
                );
        }

        return response()->json(
            [
                'message'=>'you are logged out succefully'
            ]
            );
        
    }
}
