<?php

namespace App\Http\Controllers;

use App\Models\Comment;

class MessageController extends Controller
{

    public function index()
    {

        $messages = Comment::all();
        return response()->json(compact('messages'), 200);
        
    }

    public function view($id)
    {

        $message = Comment::find($id);
        if (!$message) {
            return response()->json([
                'message' => 'message doesn\'t exist'
            ]);
        }

        return response()->json(compact('comment'), 200);
    }
}
