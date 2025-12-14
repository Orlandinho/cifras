<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSongRequest;
use App\Http\Requests\UpdateSongRequest;
use App\Http\Resources\SongResource;
use App\Models\Artist;
use App\Models\Song;
use App\Models\Tag;
use Inertia\Response;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return inertia('songs/index', [
            'filter' => request('filter'),
            'songs' => SongResource::collection(
                Song::when(request()->input('filter'), function ($query, $filter) {
                    $query->whereLike('title', "%{$filter}%")
                        ->orWhereRelation('artist', 'name', 'like', "%{$filter}%");
                })
                    ->with(['artist', 'schedules'])
                    ->orderBy('title')
                    ->paginate(15)
                    ->withQueryString()
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSongRequest $request)
    {
        try {
            $artist = Artist::where('slug', $request->validated('artist_slug'))->first();

            if (!$artist) {

                $artist = Artist::create([
                    'slug' => $request->validated('artist_slug'),
                    'name' => $request->validated('artist'),
                ]);

            }

            $artist->songs()->create($request->except('artist_slug', 'artist', 'tags'));
            $song = $artist->songs()->latest()->first();
            $song->tags()->attach($request->validated('tags'));


        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível salvar a cifra!', $e->getMessage());
        }

        return to_route('songs.index')->alertSuccess('Cifra salva com sucesso!');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia('songs/create', [
            'topics' => Tag::select('id', 'name')->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Artist $artist, Song $song): Response
    {
        return inertia('songs/show', [
            'song' => SongResource::make($song->load('artist')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artist $artist, Song $song): Response
    {
        return inertia('songs/edit', [
            'song' => SongResource::make($song->load(['artist', 'tags'])),
            'topics' => Tag::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSongRequest $request, Song $song)
    {
        try {
            $artist = Artist::where('slug', $request->validated('artist_slug'))->first();

            if ($artist) {

                $song->update([
                    'artist_id' => $artist->id,
                    'title' => $request->validated('title'),
                    'slug' => $request->validated('slug'),
                    'url' => $request->validated('url'),
                    'body' => $request->validated('body'),
                    'lyrics' => $request->validated('lyrics'),
                ]);

                $song->tags()->sync($request->validated('tags'));
            } else {

                $artist = Artist::create([
                    'slug' => $request->validated('artist_slug'),
                    'name' => $request->validated('artist'),
                ]);

                $song->update([
                    'artist_id' => $artist->id,
                    'title' => $request->validated('title'),
                    'slug' => $request->validated('slug'),
                    'url' => $request->validated('url'),
                    'body' => $request->validated('body'),
                    'lyrics' => $request->validated('lyrics'),
                ]);

                $song->tags()->attach($request->validated('tags'));
            }

        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível atualizar a cifra!');
        }

        return to_route('songs.index')->alertSuccess('Cifra atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Song $song)
    {
        try {
            $song->delete();
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível excluir a cifra!');
        }

        return to_route('songs.index')->alertSuccess('Cifra excluída com sucesso!');
    }
}
