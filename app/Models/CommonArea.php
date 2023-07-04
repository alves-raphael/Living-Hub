<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommonArea extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function condominium(): BelongsTo
    {
        return $this->belongsTo(Condominium::class);
    }
}