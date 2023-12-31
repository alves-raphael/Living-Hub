<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Condominium extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function users(): HasMany
    {
        return $this->hasMany(Users::class);
    }

    public function commonAreas(): HasMany
    {
        return $this->hasMany(CommonArea::class);
    }
}