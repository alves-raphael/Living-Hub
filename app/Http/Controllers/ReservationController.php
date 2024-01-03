<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Status;
use App\Repositories\ReservationRepository;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class ReservationController extends Controller
{
    public function __construct(private ReservationRepository $repository)
    {
    }
    public function mine()
    {
        $user = \Auth::user();
        $reservations = $this->repository->fetchByUserWithStatus($user->id);
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

        $reservation = new Reservation($request->all());
        $reservation = \Auth::user()->reservations()->save($reservation);
        $pendingStatus = Status::where('slug', Status::PENDING)->first();
        $reservation->statuses()->attach($pendingStatus->id);

        return redirect()->route('reservations.mine')->with('success', 'Reserva efetuada com sucesso!');
    }


    public function details(Request $request, int $id)
    {
        $reservation = \Auth::user()->reservations()
            ->where('id', $id)->with('commonArea', 'commonArea.condominium', 'statuses')->first();
        if (!$reservation) {
            return redirect()->back()->with('error', 'Não foi possível acessar a seção');
        }
        $cancellable = $reservation->isCancellable();
        return Inertia::render('Reservations/Details', compact('reservation', 'cancellable'));
    }

    public function cancel(int $id)
    {
        $reservation = \Auth::user()->reservations()->where('id', $id)->first();
        if (!$reservation || !$reservation->cancel()) {
            return redirect()->back()->with('error', 'Não foi possível completar esta ação');
        }
        return redirect()->route('reservations.mine')->with('success', 'Reserva cancelada com sucesso');
    }
}