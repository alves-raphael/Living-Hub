<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    public function getCurrentStatus(): ?Status
    {
        return $this->statuses->sortBy(fn($status) => $status->pivot->created_at)->last();
    }

    public function isCancellable(): bool
    {
        $currentStatus = $this->getCurrentStatus();
        return $currentStatus->slug != Status::CANCELLED && $currentStatus->slug != Status::DECLINED;
    }

    /**
     * cancel a reservation
     * @return bool true in case of success, false otherwise
     */
    public function cancel(): bool
    {
        if (!$this->isCancellable()) {
            return false;
        }
        $cancelledStatus = Status::where('slug', Status::CANCELLED)->first();
        $this->statuses()->attach($cancelledStatus->id);
        return true;
    }

    protected function startedAt(): Attribute
    {
        return Attribute::set(fn(string $date) => (new \DateTime($date))->setTimeZone(new \DateTimeZone('America/Sao_Paulo')));
    }

    protected function finishedAt(): Attribute
    {
        return Attribute::set(fn(string $date) => (new \DateTime($date))->setTimeZone(new \DateTimeZone('America/Sao_Paulo')));
    }
}