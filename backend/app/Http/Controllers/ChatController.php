<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\ChatMessages;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function index(User $user)
    {
        $messages = ChatMessages::with(['sender', 'receiver'])
            ->whereIn('sender_id', [Auth::id(), $user->id])
            ->whereIn('receiver_id', [Auth::id(), $user->id])
            ->orderBy('created_at')
            ->get();

        return response()->json($messages);
    }

    public function store(User $user, Request $request)
    {
        $message = ChatMessages::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $user->id,
            'message' => $request->message,
        ]);

        $message->load(['sender', 'receiver']);

        broadcast(new MessageSent($message));

        return response()->json($message);
    }

    public function viewUsers()
    {
        $users = [];

        $user = Auth::user();

        if ($user->accountType === "consultant") {
            // $users = User::where('id', '!=', Auth::id())->where('accountType','!=','admin')->get();
            $users = DB::table('users')->where('users.id', '!=', Auth::id())
                ->where('users.accountType', '!=', 'admin')
                ->join('entrepreneurs', 'users.id', 'entrepreneurs.user_id')
                ->join('consultations', 'entrepreneurs.id', 'consultations.entrepreneur_id')
                ->where('users.id', '!=', Auth::id())
                ->where('users.accountType', '!=', 'admin')
                ->select('users.id', 'users.firstName', 'users.lastName', 'users.email', 'users.photo', 'users.accountType')
                ->groupBy('users.id', 'users.firstName', 'users.lastName', 'users.email', 'users.photo', 'users.accountType')
                ->get();
        }
        if ($user->accountType === "entrepreneur") {

            $users = DB::table('users')
                ->join('consultants', 'users.id', 'consultants.user_id')
                ->join('consultations', 'consultants.id', 'consultations.consultant_id')
                ->where('users.id', '!=', Auth::id())
                ->where('users.accountType', '!=', 'admin')
                ->select('users.id', 'users.firstName', 'users.lastName', 'users.email', 'users.photo', 'users.accountType')
                ->groupBy('users.id', 'users.firstName', 'users.lastName', 'users.email', 'users.photo', 'users.accountType')
                ->get();
        }

        $users->map(function ($user) {
            if ($user->photo && !str_contains($user->photo, '/storage/')) {
                $user->photo = asset('storage/' . $user->photo);
            }
            return $user;
        });

        return response()->json(
            [
                'users' => $users
            ]
        );
    }

    public function user(User $user)
    {
        return response()->json([
            'user' => $user
        ]);
    }
}
