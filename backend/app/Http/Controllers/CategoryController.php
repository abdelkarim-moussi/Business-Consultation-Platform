<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

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
            'name' => 'required|min:2',
            'description' => 'required|min:10'
        ]);


        $category = Category::create($validated);

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
            'name' => 'required|min:2',
            'description' => 'required|min:10',
        ]);

        $category = Category::findOrFail($id);

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
