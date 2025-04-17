<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Claims\JwtId;
use Tymon\JWTAuth\Facades\JWTAuth;

class CategoryController extends Controller
{

    public function index()
    {

        $categories = Category::all();

        return response()->json(compact('categories'));
    }


    public function show($id)
    {

        $category = Category::find($id);

        return response()->json(compact('category'));
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|min:10',
            'contect' => 'required|min:100',
            'cover' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $path = $request->file('cover')->store('covers', 'public');

        $category = JWTAuth::user()->posts()->create($validated);

        return response()->json(
            [
                'message' => 'category created succefully',
            ],
            200
        );
    }

    public function update($id, Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|min:10',
            'contect' => 'required|min:100',
            'cover' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $category = Category::findOrFail($id);

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('covers', 'public');
            $validated['cover'] = $path;
        }

        $category->update($validated);

        return response()->json([
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }


    public function delete($id)
    {

        $category = Category::find($id);

        if (!$category) {
            return response()->json(
                [
                    'message' => 'category not exist'
                ]
            );
        }
        
        $category->delete();

        return response()->json([
            'message' => 'category deleted succefully'
        ]);
    }
}
