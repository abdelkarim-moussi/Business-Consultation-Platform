<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{

    public function index()
    {

        if (Gate::denies('index', User::class)) {
            abort(403, 'you are not allowed');
        }

        $users = User::where('accountType', '!=', 'admin')->get();
        $users->map(function ($user) {
            if ($user->photo && !str_contains($user->photo, 'storage/')) {
                $user->photo = asset('storage/' . $user->photo);
                return $user;
            }
        });

        return response()->json(
            [
                'users' => $users
            ]
        );
    }


    public function manageUserStatus($id, Request $request)
    {
        $user = User::findOrFail($id);
        $validate = $request->validate(
            [
                'status' => 'in:active,suspended'
            ]
        );

        $user->status = $request->status;
        $user->save();

        return response()->json(
            [
                'message' => "user status updated succefully"
            ]
        );
    }

    public function verify($id)
    {

        $user = User::findOrFail($id);

        $user->is_verified = 1;
        $user->save();

        return response()->json(
            [
                'message' => "user verified succefully"
            ]
        );
    }
}
