<?php

namespace App\Http\Controllers;

use App\Models\Consultant;
use App\Models\Disponibility;
use App\Models\User;
use Exception;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DisponibilityController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'consultant_id' => 'required|exists:users,id',
            'date' => 'required',
            'startTime' => 'required',
            'endTime' => 'required'
        ]);

        Disponibility::create($validated);
        return response()->json(
            [
                'message' => 'disponibility added succefuly'
            ]
        );
    }

    public function consultantDisponibilities($id)
    {
        // $consultant = User::findOrFail($id);

        // if (! Gate::allows('viewConsultantDispo', $consultant)) {
        //     return response()->json(
        //         [
        //             'error' => 'you are not allowed to see this diponibities'
        //         ],
        //         403
        //     );
        // }

        try {
            $disponibilities = Disponibility::where('consultant_id', $id)->get();
            return response()->json(
                [
                    'disponibilities' => $disponibilities
                ]
            );
        } catch (Exception $e) {

            return response()->json(
                [
                    'error' => 'there was an error',
                    $e->getMessage()
                ]
            );
        }
    }
}
