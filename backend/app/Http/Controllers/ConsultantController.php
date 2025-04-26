<?php

namespace App\Http\Controllers;

use App\Services\ConsultantService;

class ConsultantController extends Controller
{
    protected $consultantService;

    public function __construct(ConsultantService $consultantService)
    {
        $this->consultantService = $consultantService;
    }

    public function index()
    {

        $consultants = $this->consultantService->getAllConsultants();

        if (! $consultants) {
            return response()->json(
                [
                    'message' => 'there is no consultants now'
                ]
            );
        }

        return response()->json(
            [
                'consultants' => $consultants
            ],
            200
        );
    }

    public function show($id)
    {
        $data = $this->consultantService->findConsultantById($id);
        return response()->json(
            [
                $data
            ],
            200
        );
    }
}
