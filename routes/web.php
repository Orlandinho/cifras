<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\LyricsController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', function () {
    return inertia('dashboard');
});

Route::get('cifras/{artist:slug}/{song:slug}/letra', LyricsController::class)->name('lyrics.show');

Route::permanentRedirect('/', '/cifras');

Route::controller(SongController::class)->group(function () {
    Route::get('cifras', 'index')->name('songs.index');
    Route::get('cifras/{artist:slug}/{song:slug}', 'show')->name('songs.show');
});

Route::controller(ArtistController::class)->group(function () {
    Route::get('artistas', 'index')->name('artists.index');
    Route::get('artistas/{artist:slug}', 'show')->name('artists.show');
});

Route::get('temas/{tag:slug?}', [TagController::class, 'index'])->name('tags.index');

Route::middleware('auth')->group(function () {

    Route::controller(SongController::class)->group(function () {
        Route::get('cifras/criar', 'create')->name('songs.create');
        Route::post('cifras', 'store')->name('songs.store');
        Route::get('cifras/{artist:slug}/{song:slug}/editar', 'edit')->name('songs.edit');
        Route::patch('cifras/{song}', 'update')->name('songs.update');
        Route::delete('cifras/{song}', 'destroy')->name('songs.destroy');
    });

    Route::controller(ArtistController::class)->group(function () {
        Route::get('artistas/{artist:slug}/editar', 'edit')->name('artists.edit');
        Route::patch('artistas/{artist}', 'update')->name('artists.update');
        Route::delete('artistas/{artist}', 'destroy')->name('artists.destroy');
    });

    Route::controller(ScheduleController::class)->group(function () {
        Route::get('separadas', 'index')->name('schedules.index');
        Route::post('separadas/{song}', 'toggle')->name('schedules.toggle');
        Route::delete('separadas/{song}', 'destroy')->name('schedules.destroy');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
