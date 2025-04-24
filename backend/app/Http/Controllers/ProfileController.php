<?php

namespace App\Http\Controllers;

use App\Models\Consultant;
use App\Models\Entrepreneur;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function index()
    {
        $user = User::where('id', Auth::user()->id)->first();

        if ($user->accountType === 'consultant') {
            $user = DB::table('users')->join('consultants', 'users.id', 'consultants.user_id')
                ->where('users.id', Auth::user()->id)->first();
        } else if ($user->accountType === 'entrepreneur') {
            $user = DB::table('users')->join('entrepreneurs', 'users.id', 'entrepreneurs.user_id')
                ->where('users.id', Auth::user()->id)->first();
        }



        return response()->json(
            [
                'user' => $user
            ]
        );
    }

    public function update($id, Request $request)
    {
        try {
            $user = User::findOrFail($id);

            if (Auth::user()->accountType === 'consultant') {
                $validated = $request->validate([
                    'firstName' => 'required',
                    'lastName' => 'required',
                    'email' => 'required|email|unique:users,email,' . $id,
                    'experience' => 'required',
                    'domainExpertise' => 'required',
                    'tags' => 'sometimes'
                ]);
            } elseif (Auth::user()->accountType === 'entrepreneur') {
                $validated = $request->validate([
                    'firstName' => 'required',
                    'lastName' => 'required',
                    'email' => 'required|email|unique:users,email,' . $id,
                    'sectorActivity' => 'required',
                ]);
            } else {
                return response()->json(['error' => 'Invalid account type'], 400);
            }

            DB::beginTransaction();

            $user->firstName = $validated['firstName'];
            $user->lastName = $validated['lastName'];
            $user->email = $validated['email'];
            $user->save();

            if ($user->accountType === "consultant") {
                $consultant = Consultant::where('user_id', $id)->first();
                $consultant->update([
                    'experience' => $validated['experience'],
                    'domainExpertise' => $validated['domainExpertise'],
                    'tags' => $validated['tags']
                ]);
            } elseif ($user->accountType === "entrepreneur") {
                $consultant = Entrepreneur::where('user_id', $id)->first();
                $consultant->update([
                    'sectorActivity' => $validated['sectorActivity'],

                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Details updated successfully',
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            report($e);
            DB::rollBack();

            return response()->json([
                'error' => 'An unexpected error occurred' . $e
            ], 500);
        }
    }


    public function updatePhoto(Request $request)
    {
        $path['photo'] = [];
        if ($request->hasfile('updated-photo')) {
            $path['photo'] = $request->file('updated-photo')->store('photos', 'public');
        }

        if ($path['photo']) {
            $user = User::find(Auth::user()->id);
            $user->update($path);
        }

        return redirect('/profile');
    }
}
