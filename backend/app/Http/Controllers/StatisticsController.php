<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\User;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function Consultations()
    {
        $consultations = Consultation::all();

        return response()->json(
            [
                'consultations' => $consultations
            ]
        );
    }

    public function consultants()
    {
        $consultants = User::all()->where(['accountType' => 'consultant']);

        return response()->json(
            [
                'consultants' => $consultants
            ]
        );
    }

    public function entrepreneurs()
    {
        $entrepreneurs = User::all()->where(['accountType' => 'entrepreneur']);

        return response()->json(
            [
                'entrepreneurs' => $entrepreneurs
            ]
        );
    }

    public function ConsultationsForEntrepreneur($id)
    {

        $consultations = Consultation::with(['consultant', 'entrepreneur'])
            ->where('entrepreneur_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
