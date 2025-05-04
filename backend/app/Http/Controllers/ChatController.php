<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\ChatMessages;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $users = User::where('id', '!=', Auth::id())->get();


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
