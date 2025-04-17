<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Claims\JwtId;
use Tymon\JWTAuth\Facades\JWTAuth;

class CategoryController extends Controller
{
   
    public function index(){

        $categories = Category::all();

        return response()->json(compact('categories'));

    }


    public function show($id){

        $category = Category::find($id); 
        
        return response()->json(compact('category'));

    }

    public function store(Request $request){

        $validated = $request->validate([
            'title' => 'required|min:10',
            'contect' => 'required|min:100',
            'cover' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048', 
        ]);
        
        $path = $request->file('cover')->store('covers', 'public');

        $category = JWTAuth::user()->posts()->create($validated);

        return response()->json(
            [
                'message'=>'category created succefully',
            ],200);

    }

    public function update($id,Request $request){
        
       $consultation = $this->consultationService->updateConsultation($id,$request);
       return response()->json(
        [
            'message'=>'consultation updated succefully',
            'consultation'=>$consultation
        ]
        );

    }
    
    public function cancel($id){

       return $this->consultationService->cancelConsultation($id);
    }

    public function accept($id){

       return $this->consultationService->acceptConsultation($id);
    }

    public function refuse($id){

       return $this->consultationService->refuseConsultation($id);
    }
}
