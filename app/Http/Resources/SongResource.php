<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SongResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'url' => $this->url,
            'body' => $this->body,
            'lyrics' => $this->lyrics,
            'artist' => ArtistResource::make($this->whenLoaded('artist')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'schedules' => ScheduleResource::collection($this->whenLoaded('schedules')),
            'schedules_for_today' => ScheduleResource::make($this->whenLoaded('schedules_for_today')),
        ];
    }
}
