<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Consultation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

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


    public function entrepreneurStats($entrepreneurId)
    {
        $entrepreneur = User::findOrFail($entrepreneurId);
        if (! Gate::allows('viewEntrepreneurDashboard', $entrepreneur)) {
            abort(403);
        }

        return response()->json([
            'success' => true,
            'stats' => [

                'total_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)->count(),
                'completed_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'done')->count(),
                'refused_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'refused')->count(),
                'accepted_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'accepted')->count(),
                'pending_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'pending')->count(),
                'canceled_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'cancel')->count(),
            ]
        ]);
    }


    public function consultantStats($consultantId)
    {
        $consultant = User::findOrFail($consultantId);

        if (! Gate::allows('viewConsultantDashboard', $consultant)) {
            abort(403);
        }

        $latestCustomers = DB::table(DB::raw("
        (
            SELECT DISTINCT ON (c.entrepreneur_id) 
                c.*, u.*
            FROM consultations c
            JOIN users u ON u.id = c.entrepreneur_id
            WHERE c.consultant_id = ?
            ORDER BY c.entrepreneur_id, c.created_at DESC
        )
        "))
            ->setBindings([$consultantId])
            ->limit(5)
            ->get();

        $latestCustomers->map(function ($customer) {
            $customer->photo = asset('storage/' . $customer->photo);
            return $customer;
        });


        return response()->json([
            'success' => true,
            'data' => [
                'total_consultations' => Consultation::where('consultant_id', $consultantId)->count(),
                'completed_consultations' => Consultation::where('consultant_id', $consultantId)
                    ->where('status', 'done')->count(),
                'accepted_consultations' => Consultation::where('consultant_id', $consultantId)
                    ->where('status', 'accepted')->count(),
                'refused_consultations' => Consultation::where('consultant_id', $consultantId)
                    ->where('status', 'refused')->count(),
                'upcoming_consultations' => Consultation::where('consultant_id', $consultantId)
                    ->where('status', 'pending')->count(),

                'article_stats' => [
                    'total_articles' => Article::where('author_id', $consultantId)->count(),
                    'latest_articles' => Article::select('id', 'title', 'author_id', 'created_at')->where('author_id', $consultantId)->limit(4)->get()
                ],

                'latest_customers' => $latestCustomers

            ]
        ]);
    }

    public function adminStats()
    {
        if (! Gate::allows('viewAdminDashboard', User::class)) {
            abort(403, 'you are not allowed');
        }

        return response()->json([
            'success' => true,
            'stats' => [
                'total_users' => User::where('accountType', '!=', 'admin')->count(),
                'total_entrepreneurs' => User::where('accountType', 'entrepreneur')->count(),
                'total_consultants' => User::where('accountType', 'consultant')->count(),
                'total_consultations' => Consultation::count(),
                'completed_consultations' => Consultation::where('status', 'done')->count(),
                'accepted_consultations' => Consultation::where('status', 'accepted')->count(),
                'refused_consultations' => Consultation::where('status', 'refused')->count(),
                'upcoming_consultations' => Consultation::where('status', 'pending')->count(),
                'canceled_consultations' => Consultation::where('status', 'cancel')->count(),
                'total_articles' => Article::count(),
                'popular_categories' => $this->getPopularCategories(),
            ]
        ]);
    }

    private function getPopularCategories()
    {
        return DB::table('articles')
            ->join('categories', 'articles.category_id', 'categories.id')
            ->selectRaw('category_id,name, COUNT(*) as count')
            ->groupBy('category_id','name')
            ->orderByDesc('count')
            ->limit(5)
            ->get();
    }
}
