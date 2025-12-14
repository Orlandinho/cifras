<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Http\Resources\TagResource;
use App\Models\Song;
use App\Models\Tag;

class TagController extends Controller
{
    public function index(Tag $tag = null)

    {
        if ($tag) {
            $songs = SongResource::collection(
                Song::whereHas('tags', function ($query) use ($tag) {
                    $query->where('tags.id', $tag->id);
                })->with(['artist', 'schedules'])->withCount('schedules')->orderBy('title')->get()
            );
        } else {
            $songs = [];
        }
        return inertia('tags/index', [
            'songs' => $songs,
            'tag' => $tag,
            'topics' => TagResource::collection(Tag::all())
        ]);
    }
}
