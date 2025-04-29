<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommentController extends Controller
{

    public function index()
    {
        $comment = Comment::all();
        return response()->json(compact('comment'), 200);
    }

    public function view($id)
    {

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'comment' => 'comment doesn\'t exist'
            ]);
        }

        return response()->json(compact('comment'), 200);
    }

    public function store(Request $request)
    {
        $request['user_id'] = JWTAuth::user()->id;

        $validated = $request->validate([
            'content' => 'required|min:1',
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
            'parent_id' => 'sometimes|min:1'
        ]);

        $comment = Comment::create($validated);

        return response()->json(
            [
                'message' => 'comment added succefully',
                'comment' => $comment
            ]
        );
    }
}
