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


    public function manageUserStatus($id, $status) {}

    public function verifie($id) {}
}
