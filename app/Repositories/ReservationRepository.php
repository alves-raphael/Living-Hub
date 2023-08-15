<?php

namespace App\Repositories;

use DB;
use Illuminate\Database\Query\JoinClause;

class ReservationRepository
{
    public function fetchByUserWithStatus(int $userId)
    {
        $currentStatusQuery = DB::table('reservation_status AS rs')
            ->select(
                'rs.reservation_id',
                DB::raw('MAX(created_at) as created_at'),
                DB::raw('MAX(status_id) as status_id')
            )->groupBy('reservation_id');
        return DB::table('reservations AS r')->select(
            'started_at',
            'finished_at',
            'name AS common_area',
            'r.id',
            's.description AS current_status',
            's.color AS status_color'
        )
            ->join('common_areas AS ca', 'ca.id', '=', 'r.common_area_id')
            ->joinSub($currentStatusQuery, 'cs', function (JoinClause $join) {
                $join->on('cs.reservation_id', '=', 'r.id');
            })
            ->join('statuses AS s', 's.id', '=', 'cs.status_id')
            ->where('r.user_id', $userId)
            ->orderBy('r.created_at', 'desc')
            ->get();
    }
}