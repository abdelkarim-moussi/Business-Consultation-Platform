<?php

namespace App\Policies;

use App\Models\Consultant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }

    public function viewAdminDashboard(User $user)
    {
        // Only allow users with 'admin' role to view the dashboard
        return $user->accountType === 'admin';
    }

    public function viewEntrepreneurDashboard($user)
    {
        // Only allow users with 'entrepreneur' role to view the dashboard
        return $user->accountType === 'entrepreneur';
    }

    public function viewConsultantDashboard($user)
    {
        // Only allow users with 'consultant' role to view the dashboard
        return $user->accountType === 'consultant';
    }

    public function viewConsultConsultations(User $authUser, User $targetUser): bool
    {
        return $authUser->id === $targetUser->id && $targetUser->accountType === "consultant";
    }

    public function viewEntrepreneurConsultations(User $authUser, User $targetUser): bool
    {
        return $authUser->id === $targetUser->id && $targetUser->accountType === "entrepreneur";
    }
}
