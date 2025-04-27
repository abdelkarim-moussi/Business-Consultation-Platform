<?php

namespace App\Http\Controllers;

use App\Models\Consultant;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReviewController extends Controller
{

    public function store(Request $request)
    {

        Gate::authorize('create', Review::class);


        $validated = $request->validate([
            'consultant_id' => 'required',
            'reviewer_id' => 'required',
            'reviewText' => 'required|min:20',
            'rating' => 'required'
        ]);


        $existingReview = Review::where('reviewer_id', $request->reviewer_id)
            ->where('consultant_id', $request->consultant_id)
            ->first();

        if ($existingReview) {
            return response()->json([
                'error' => 'You already reviewed this consultant'
            ], 400);
        }

        Review::create($validated);

        return response()->json([
            'message' => 'Review added successfully'
        ], 201);
    }


    public function destroy($id)
    {

        $ExistingReview = Review::findOrFail($id);

        $ExistingReview->delete();

        return response()->json(
            [
                'message' => 'review deleted succefully'
            ]
        );
    }
}
