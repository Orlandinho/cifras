<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{

    protected $fillable = ['date'];

    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
        ];
    }
}
