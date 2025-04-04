<?php

namespace App\Policies;

use App\Models\Consultation;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class ConsultationPolicy
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
    public function view(User $user, Consultation $consultation): bool
    {
        return $consultation->consultant_id === $user->id ?? $consultation->entrepreneur_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->accountType === "entrepreneur";
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Consultation $consultation): bool
    {
        return $user->id === $consultation->entrepreneur_id;
    }

    public function cancel(User $user,Consultation $consultation):bool
    {
        return $user->id === $consultation->entrepreneur_id;
    }

    public function accept(User $user,Consultation $consultation):bool
    {
        return $user->id === $consultation->consultant_id;
    }
    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Consultation $consultation): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Consultation $consultation): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Consultation $consultation): bool
    {
        return false;
    }
}
