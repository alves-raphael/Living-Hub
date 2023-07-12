<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = ['common_area_id', 'started_at', 'finished_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function commonArea(): BelongsTo
    {
        return $this->belongsTo(CommonArea::class);
    }

    public function statuses(): BelongsToMany
    {
        return $this->belongsToMany(Status::class)->withTimestamps();
    }

    public function fetchCurrentStatus(): Status
    {
        return $this->statuses()->orderBy('created_at', 'DESC')->first();
    }
}