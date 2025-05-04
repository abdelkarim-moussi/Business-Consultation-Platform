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


    public function platformOverview()
    {
        if (! Gate::allows('viewAdminDashboard')) {
            abort(403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'total_users' => User::count(),
                'total_entrepreneurs' => User::where('role', 'entrepreneur')->count(),
                'total_consultants' => User::where('role', 'consultant')->count(),
                'total_consultations' => Consultation::count(),
                'completed_consultations' => Consultation::where('status', 'completed')->count(),
                'upcoming_consultations' => Consultation::where('status', 'scheduled')->count(),
                'total_articles' => Article::count(),
                'popular_categories' => $this->getPopularCategories(),
                'user_growth' => $this->getUserGrowthStats(),
            ]
        ]);
    }

    public function entrepreneurStats($entrepreneurId)
    {
        $entrepreneur = User::findOrFail($entrepreneurId);
        if (! Gate::allows('viewEntrepreneurDashboard', $entrepreneur)) {
            abort(403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)->get(),
                'total_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)->count(),
                'completed_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'done')->count(),
                'refused_consultations' =>Consultation::where('entrepreneur_id', $entrepreneurId)
                ->where('status', 'refused')->count(),
                'accepted_consultations' =>Consultation::where('entrepreneur_id', $entrepreneurId)
                ->where('status', 'accepted')->count(),
                'pending_consultations' =>Consultation::where('entrepreneur_id', $entrepreneurId)
                ->where('status', 'pending')->count(),
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

    private function getPopularCategories()
    {
        return Article::selectRaw('category_id, COUNT(*) as count')
            ->groupBy('category_id')
            ->orderByDesc('count')
            ->limit(5)
            ->get();
    }


    private function getUserGrowthStats()
    {
        return [
            'last_7_days' => User::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
            'last_30_days' => User::where('created_at', '>=', Carbon::now()->subDays(30))->count(),
            'growth_rate' => $this->calculateGrowthRate(),
        ];
    }

    private function calculateGrowthRate()
    {
        $currentMonth = User::whereMonth('created_at', Carbon::now()->month)->count();
        $previousMonth = User::whereMonth('created_at', Carbon::now()->subMonth()->month)->count();

        return $previousMonth > 0
            ? round(($currentMonth - $previousMonth) / $previousMonth * 100, 2)
            : 0;
    }

    private function getEntrepreneurFavoriteCategories($entrepreneurId)
    {
        return Article::where('author_id', $entrepreneurId)
            ->selectRaw('category_id, COUNT(*) as count')
            ->groupBy('category_id')
            ->orderByDesc('count')
            ->limit(3)
            ->get();
    }

    private function getEntrepreneurConsultationTrends($entrepreneurId)
    {
        return Consultation::where('entrepreneur_id', $entrepreneurId)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('created_at')
            ->orderBy('created_at')
            ->get();
    }

    private function getAverageRatingGiven($entrepreneurId)
    {
        return Consultation::where('entrepreneur_id', $entrepreneurId);
    }


    private function getConsultantAverageRating($consultantId)
    {
        return Consultation::where('consultant_id', $consultantId);
    }
}
