<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function mine()
    {
        $user = \Auth::user();
        $reservations = $user->reservations()->get();
        $reservations->load('commonArea');
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

    public function store(Request $request)
    {
        $request->validate([
            'common_area_id' => 'required|int',
            'started_at' => 'required|date|before:finished_at|after:today',
            'finished_at' => 'required|date|after:started_at'
        ]);

        $fields = $request->all();
        $fields['started_at'] = (new \DateTime($fields['started_at']))->setTimeZone(new \DateTimeZone('America/Sao_Paulo'));
        $fields['finished_at'] = (new \DateTime($fields['finished_at']))->setTimeZone(new \DateTimeZone('America/Sao_Paulo'));
        \Auth::user()->reservations()->create($fields);
        Reservation::create($fields);

        return redirect()->route('reservations.mine')->with('success', 'Reserva efetuada com sucesso!');
    }

}