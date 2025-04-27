<?php

namespace App\Repositories;

use App\Models\Consultant;
use App\Models\Consultation;
use App\Models\Review;
use App\Repositories\Interfaces\ConsultantRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ConsultantRepository implements ConsultantRepositoryInterface
{

    public function getAll()
    {

        return  DB::table('users')->join('consultants', 'users.id', 'consultants.user_id')->get();
    }

    public function findById($id)
    {
        $consultant = DB::table('users')
            ->join('consultants', 'users.id', '=', 'consultants.user_id')
            ->where('consultants.id', $id)
            ->select('users.*', 'consultants.*')
            ->first();

        $consultations_num = Consultation::where('consultant_id', $id)->count();

        $reviews = DB::table('reviews')->join('users', 'reviews.reviewer_id', 'users.id')
            ->where('reviews.consultant_id', $id)
            ->select('reviews.id','reviews.reviewer_id','reviews.consultant_id','reviews.rating','reviews.reviewText','users.firstName','users.lastName')
            ->get();
        
        $reviews_num = $reviews->count();

        $data = [
            'consultant' => $consultant,
            'consultations_num' => $consultations_num,
            'reviews' => $reviews,
            'reviews_num' => $reviews_num,
        ];

        return $data;
    }
}
