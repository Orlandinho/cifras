<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Http\Resources\SongResource;
use App\Models\Schedule;
use App\Models\Song;
use Inertia\Response;

class ScheduleController extends Controller
{
    public function index(): Response
    {
        return inertia('schedules/index', [
            'schedules' => ScheduleResource::collection(Schedule::with('song.artist')->whereDate('date', now()->toDateString())->get()),
            'recent' => ScheduleResource::collection(Schedule::with('song.artist')->latest()->limit(30)->get()),
            'popular' => SongResource::collection(
                Song::withCount('schedules')
                    ->with(['artist', 'schedules'])
                    ->having('schedules_count', '>', 0)
                    ->orderByDesc('schedules_count')
                    ->limit(20)
                    ->get()
            ),
        ]);
    }

    public function toggle(Song $song)
    {
        try {
            if ($song->schedules()->where('date', now()->toDateString())->exists()) {
                $song->schedules()->where('date', now()->toDateString())->delete();
            } else {
                $song->schedules()->create([
                    'date' => now()->toDateString(),
                ]);
            }
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível separar essa cifra');
        }

        return back();
    }

    public function destroy(Song $song)
    {
        try {
            $song->schedules()->where('date', now()->toDateString())->delete();;
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível remover essa cifra');
        }

        return back();
    }
}
