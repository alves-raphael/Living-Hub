<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function mine()
    {
        $user = \Auth::user();
        $reservations = $user->reservations()->get();
        return Inertia::render('Reservations/Mine', compact('reservations'));
    }

    public function create()
    {
        $user = \Auth::user()->load(['condominium', 'condominium.commonAreas']);
        $areas = $user->condominium->commonAreas()->get()->map(function ($area) {
            return ['value' => $area->id, 'label' => $area->name];
        });
        return Inertia::render('Reservations/Create', compact('areas'));
    }

}