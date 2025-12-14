<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArtistResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'songs_count' => $this->whenCounted('songs'),
            //TODO
            //needs to be fixed
            //'songs' => SongResource::collection(Song::where('artist_id', $this->id)->with('schedules')->get()),
            'songs' => SongResource::collection($this->whenLoaded('songs', $this->whenLoaded('songs', fn() => $this->songs->load('schedules')))),

        ];
    }
}
