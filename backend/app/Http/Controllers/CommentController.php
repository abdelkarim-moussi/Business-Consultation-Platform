<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Support\Facades\Request;

class CommentController extends Controller
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

    public function store(Request $request)
    {

        $validated = $request->validate([
            'content' => 'required|min:1',
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
            'parent_id' => 'sometimes|min:1'
        ]);

        Comment::create($validated);

        return response()->json(
            [
                'message' => 'comment added succefully'
            ]
        );
    }
}
