<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artist extends Model
{
    /** @use HasFactory<\Database\Factories\ArtistFactory> */
    use HasFactory;

    protected $fillable = ['name','slug'];

    public function songs(): HasMany
    {
        return $this->hasMany(Song::class)->orderBy('title');
    }
}
