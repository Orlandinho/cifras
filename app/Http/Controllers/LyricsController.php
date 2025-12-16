<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Song;

class LyricsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Artist $artist, Song $song)
    {
        return inertia('lyrics/show', [
            'song' => $song->load('artist')
        ]);
    }
}
