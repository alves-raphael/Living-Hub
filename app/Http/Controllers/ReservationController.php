<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class ReservationController extends Controller
{
    public function mine()
    {
        $user = \Auth::user();
        $reservations = DB::table('reservations AS r')->select(
            'started_at',
            'finished_at',
            'name as common_area',
            DB::raw('(select description from statuses s
                inner join reservation_status rs ON s.id = rs.status_id
                where rs.reservation_id = r.id
                order by rs.created_at desc
                limit 1) as current_status'
            ),
            DB::raw('(select color from statuses s
                inner join reservation_status rs ON s.id = rs.status_id
                where rs.reservation_id = r.id
                order by rs.created_at desc
                limit 1) as status_color'
            ),
        )
            ->join('common_areas AS ca', 'ca.id', '=', 'r.common_area_id')
            ->where('r.user_id', $user->id)
            ->orderBy('r.created_at', 'desc')
            ->get();
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
        $reservation = \Auth::user()->reservations()->create($fields);
        $pendingStatus = Status::where('slug', Status::PENDING)->first();
        $reservation->statuses()->attach($pendingStatus->id);

        return redirect()->route('reservations.mine')->with('success', 'Reserva efetuada com sucesso!');
    }

}