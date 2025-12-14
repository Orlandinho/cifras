<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateArtistRequest;
use App\Http\Resources\ArtistResource;
use App\Models\Artist;
use Inertia\Response;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return inertia('artists/index', [
            'artists' => ArtistResource::collection(Artist::with('songs')->withCount('songs')->orderBy('name')->paginate(15)),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Artist $artist): Response
    {
        return inertia('artists/show', [
            'artist' => ArtistResource::make($artist->load('songs')),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artist $artist): Response
    {
        return inertia('artists/edit', [
            'artist' => ArtistResource::make($artist),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtistRequest $request, Artist $artist)
    {
        try {
            $artist->update($request->validated());
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível atualizar o(a) artista/grupo!');
        }
        return to_route('artists.index')->alertSuccess('Artista/grupo atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artist $artist)
    {
        try {
            $artist->delete();
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível apagar o(a) artista/grupo!');
        }
        return to_route('artists.index')->alertSuccess('Artista/grupo apagado com sucesso!');
    }
}
