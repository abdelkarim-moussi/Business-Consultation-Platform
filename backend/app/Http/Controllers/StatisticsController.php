<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Consultation;
use App\Models\User;
use Carbon\Carbon;
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


    public function platformOverview()
    {
        $this->authorize('viewAdminDashboard', User::class);
        
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
        $this->authorize('view', $entrepreneur);
        
        return response()->json([
            'success' => true,
            'data' => [
                'total_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)->count(),
                'completed_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'completed')->count(),
                'upcoming_consultations' => Consultation::where('entrepreneur_id', $entrepreneurId)
                    ->where('status', 'scheduled')->count(),
                'favorite_categories' => $this->getEntrepreneurFavoriteCategories($entrepreneurId),
                'consultation_trends' => $this->getEntrepreneurConsultationTrends($entrepreneurId),
                'average_rating_given' => $this->getAverageRatingGiven($entrepreneurId),
            ]
        ]);
    }


    public function consultantStats($consultantId)
    {
        $consultant = User::findOrFail($consultantId);
        $this->authorize('view', $consultant);
        
        return response()->json([
            'success' => true,
            'data' => [
                'total_consultations' => Consultation::where('consultant_id', $consultantId)->count(),
                'completed_consultations' => Consultation::where('consultant_id', $consultantId)
                    ->where('status', 'completed')->count(),
                'upcoming_consultations' => Consultation::where('consultant_id', $consultantId)
                    ->where('status', 'scheduled')->count(),
                'average_rating' => $this->getConsultantAverageRating($consultantId),
                'article_stats' => [
                    'total_articles' => Article::where('author_id', $consultantId)->count(),
                ],
            
            ]
        ]);
    }

    private function getPopularCategories()
    {
        return Consultation::selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
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
        return Consultation::where('entrepreneur_id', $entrepreneurId)
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->orderByDesc('count')
            ->limit(3)
            ->get();
    }

    private function getEntrepreneurConsultationTrends($entrepreneurId)
    {
        return Consultation::where('entrepreneur_id', $entrepreneurId)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    private function getAverageRatingGiven($entrepreneurId)
    {
        return Consultation::where('entrepreneur_id', $entrepreneurId)
            ->whereNotNull('rating')
            ->avg('rating');
    }


    private function getConsultantAverageRating($consultantId)
    {
        return Consultation::where('consultant_id', $consultantId)
            ->whereNotNull('rating')
            ->avg('rating');
    }


}
