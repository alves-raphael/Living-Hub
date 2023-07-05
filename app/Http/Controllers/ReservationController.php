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

}