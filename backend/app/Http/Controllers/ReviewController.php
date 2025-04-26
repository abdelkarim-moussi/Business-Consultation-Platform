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

        $review = Review::where('reviewer_id', '=', $request['reviewer_id'])->get();

        if (! Gate::allows('create', Review::class)) {
            abort(403,'you are not allowed to add a review');
        }

        $validated = $request->validate(
            [
                'consultant_id' => 'required',
                'reviewer_id' => 'required',
                'reviewText' => 'required|min:20',
                'rating' => 'required'
            ]
        );

        if ($review) {
            return response()->json(
                [
                    'error' => 'you already reviewed this consultant'
                ]
            );
        }

        Review::create($validated);

        return response()->json(
            [
                'message' => 'review added succefully'
            ]
        );
    }
}
